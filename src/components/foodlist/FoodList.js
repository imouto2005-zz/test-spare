import React from 'react'
import FoodItem from './FoodItem'
import axios from 'axios'
import localforage from 'localforage'

class FoodList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      foods: [],
      nameInput: '',
      cuisineInput: '',
      placeInput: ''
    }
    this.addFood = this.addFood.bind(this)
    this.fetchFoods = this.fetchFoods.bind(this)
    this.removeFood = this.removeFood.bind(this)
    this.handleNameInputOnChange = this.handleNameInputOnChange.bind(this)
    this.handleCuisineInputOnChange = this.handleCuisineInputOnChange.bind(this)
    this.handlePlaceInputOnChange = this.handlePlaceInputOnChange.bind(this)
  }

  componentDidMount () {
    console.log('component is mounting');
    this.fetchFoods()
  }

  fetchFoods () {
    localforage.getItem('appName')
    .then((authInfo) => {
      const headers = typeof authInfo === "string" ? JSON.parse(authInfo) : authInfo
      return axios({
        method: 'GET',
        url: 'https://project4backend.herokuapp.com/foods',
        headers,
      })
    }).then((response) => {
      console.log(`fetch food response: ${response}`)
      this.setState({ foods: response.data })
    })
  }

  addFood () {
    const newName = this.state.nameInput
    const newCuisine = this.state.cuisineInput
    const newPlace = this.state.placeInput
    localforage.getItem('appName')
    .then((authInfo) => {
      const headers = typeof authInfo === "string" ? JSON.parse(authInfo) : authInfo
      return axios({
        method: 'POST',
        url: 'https://project4backend.herokuapp.com/foods',
        headers,
        data: {
          name: newName,
          cuisine: newCuisine,
          place: newPlace
        }
      })
    }).then((response) => {
      console.log('adding food');
      console.log(`add food response: ${response}`)
      this.setState({
        nameInput: '',
        cuisineInput: '',
        placeInput: ''
      })
      this.fetchFoods()
    })
  }

  removeFood (id) {
    console.log(`we are gonna delete this food ${id}`)
    let url = 'https://project4backend.herokuapp.com/foods/' + id
    console.log(url)
    localforage.getItem('appName')
    .then((authInfo) => {
      const headers = typeof authInfo === "string" ? JSON.parse(authInfo) : authInfo
      return axios({
        method: 'DELETE',
        url: url,
        headers,
      })
    })
    .then((response) => {
      this.fetchFoods()
    })
  }

  handleNameInputOnChange (e) {
    this.setState({ nameInput: e.target.value })
  }

  handleCuisineInputOnChange (e) {
    this.setState({ cuisineInput: e.target.value })
  }

  handlePlaceInputOnChange (e) {
    this.setState({ placeInput: e.target.value })
  }

  randPick (e) {
    let randomVal = Math.floor(Math.random() * this.state.foods.length)
    document.getElementById('chosen-food').innerHTML = this.state.foods[randomVal].name
  }

  render () {
    const addFood = this.addFood
    const removeFood = this.removeFood
    return (
      <div className='food-list'>
        <h2 id="food-header"><i className="em em-fork_and_knife"></i>All your favourite dining spots!<i className="em em-pizza"></i></h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          addFood()
        }}>
          <input autoFocus id="activity-form" type='text' value={this.state.nameInput} onChange={this.handleNameInputOnChange} placeholder="Where do you like to eat at? Add it here!"/>

          {/* <label>Cuisine:</label>
          <input type='text' value={this.state.cuisineInput} onChange={this.handleCuisineInputOnChange} placeholder='Japanese/Thai/Italian etc' /><br /><br />

          <label>Type of place:</label>
          <input type='text' value={this.state.placeInput} onChange={this.handlePlaceInputOnChange} placeholder='Restaurant/Cafe/Hawker Centre etc' /><br /><br /> */}

          <button id="food-submit">Submit</button><br />
        </form>

        <div className='activities'>
          {
              this.state.foods.map((item) => {
                return (
                  <FoodItem
                    food={item.name}
                    cuisine={item.cuisine}
                    place={item.place}
                    key={item.id}
                    id={item.id}
                    onClickDelete={removeFood}
                    />
                )
              })
            }
          <button id='rand-btn' onClick={(e) => this.randPick(e)}> RANDOM SELECT </button>
          <h2 id="food-header-2">You will be eating at:</h2>
          <h3 id='chosen-food' />
        </div>
      </div>
    )
  }

}

export default FoodList

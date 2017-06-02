import React from 'react'
import axios from 'axios'
import localforage from 'localforage'

class FoodMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchForm: '',
      results: []
    };
    this.handleSearchFormOnChange = this.handleSearchFormOnChange.bind(this)
    this.sendSearchVal = this.sendSearchVal.bind(this)
  }

  sendSearchVal() {
    const searchVal = this.state.searchForm
    localforage.getItem('appName')
    .then((authInfo) => {
      const headers = typeof authInfo === "string" ? JSON.parse(authInfo) : authInfo
      return axios({
        method: 'GET',
        url: 'https://project4backend.herokuapp.com/foods/search',
        headers,
        params: { location: searchVal }
      })
    }).then((response) => {
      this.setState({
        searchForm: '',
        results: response.data.results
      })
    })
  }

  handleSearchFormOnChange (e) {
    console.log(e.target.value)
    this.setState({ searchForm: e.target.value })
  }

  render() {
    const sendSearchVal = this.sendSearchVal
    return (
      <div>
        <h2 id="foodmap-header">Where are you going? Find some food there!</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          sendSearchVal()
        }}>
          <input id="foodmap-input" autoFocus type='text' value={this.state.searchForm} onChange={this.handleSearchFormOnChange} placeholder='Location' />
          <button id="foodmap-button">Submit</button>
        </form>

        <div className="search-results">
          {
            this.state.results.map((item) => {
                return (
                    <p id="foodmap-item">
                    <span id="foodmap-title">{item.name}</span> <br />
                    <i className="em em-pushpin"></i>{' '}{item.formatted_address} <br />
                  { item.rating && <div>{item.rating} <i className="em em-star"></i></div>}
                  </p>
                )
            })
          }
        </div>
      </div>
    );
  }

}

export default FoodMap;

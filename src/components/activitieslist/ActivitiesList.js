import React from 'react'
import ActivityItem from './ActivityItem'
import axios from 'axios'
import localforage from 'localforage'

class ActivitiesList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activities: [],
      activityForm: ''
    }
    this.handleActivityFormOnChange = this.handleActivityFormOnChange.bind(this)
    this.fetchActivities = this.fetchActivities.bind(this)
    this.addActivity = this.addActivity.bind(this)
    this.removeActivity = this.removeActivity.bind(this)
  }

  componentDidMount () {
    this.fetchActivities()
  }

  fetchActivities () {
    localforage.getItem('appName')
    .then((authInfo) => {
      const headers = typeof authInfo === "string" ? JSON.parse(authInfo) : authInfo
      return axios({
        method: 'GET',
        url: 'https://project4backend.herokuapp.com/activities',
        headers,
      })
    }).then((response) => {
      console.log(response)
      this.setState({ activities: response.data })
    })
  }

  addActivity () {
    const newactivity = this.state.activityForm
    localforage.getItem('appName')
    .then((authInfo) => {
      const headers = typeof authInfo === "string" ? JSON.parse(authInfo) : authInfo
      return axios({
        method: 'POST',
        url: 'https://project4backend.herokuapp.com/activities',
        headers,
        data: { data: newactivity }
      })
    }).then((response) => {
      console.log(response)
      this.setState({ activityForm: '' })
      this.fetchActivities()
    })
  }

  removeActivity(id) {
    console.log(`we are gonna delete this item ${id}`)
    let url = 'https://project4backend.herokuapp.com/activities/' + id
    console.log(url);
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
      this.fetchActivities()
    })
  }

  handleActivityFormOnChange (e) {
    console.log(e.target.value);
    this.setState({ activityForm: e.target.value })
  }

  randPick(e) {
    let randomVal = Math.floor(Math.random() * this.state.activities.length);
    document.getElementById('chosen-activity').innerHTML=this.state.activities[randomVal].description;
  }

  render () {
    const addActivity = this.addActivity
    const removeActivity = this.removeActivity
    return (
      <div className='activity-list'>
        <h2 id="activity-list-header"><i className="em em-confetti_ball"></i> YOUR FUN ACTIVITIES <i className="em em-confetti_ball"></i></h2>
        <center><div className='activity-suggestions'>
        <span id="suggestion-title">Not sure where to begin? Here is a list of sample activities!</span> <br />
        <ul>
          <li> Try out a new recipe from the internet </li>
          <li> Catch an Omnimax show at the Science Centre </li>
          <li> Build a website (for educational purposes - you know you want to!) </li>
          <li> Marathon all 7 Harry Potter movies in one day </li>
          <li> Visit Mustafa mall and buy things you never knew you needed </li>
          <li> AND SO MUCH MORE! </li>
        </ul>
        </div></center>
        <form onSubmit={(event) => {
          event.preventDefault()
          addActivity()
        }}>
          <input autoFocus id="activity-form" type='text' value={this.state.activityForm} onChange={this.handleActivityFormOnChange} placeholder='Add your own fun activity here!' />
          <button id="add-activity">Submit</button>
        </form>

        <div className='activities'>
            {
              this.state.activities.map((item) => {
                  return (
                    <ActivityItem
                      activity={item.description}
                      key={item.id}
                      id={item.id}
                      onClickDelete={ removeActivity }
                    />
                  )
              })
            }
              <button id="rand-btn" onClick={(e) => this.randPick(e)}> RANDOM SELECT </button>
              <h2 id="activity-header-2">Your fun and RANDOMLY SELECTED activity is:</h2>
              <h3 id="chosen-activity"></h3>
        </div>
      </div>
    )
  }
}

export default ActivitiesList

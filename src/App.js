import React, { Component } from 'react'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import localforage from 'localforage'
import axios from 'axios'
import './App.css'
import Home from './components/home/Home'
import { Redirect } from 'react-router'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'

import ActivitiesHome from './components/activitieslist/ActivitiesHome'
import FoodHome from './components/foodlist/FoodHome'
import ActivitiesList from './components/activitieslist/ActivitiesList'
import SuggestedActivities from './components/activitieslist/SuggestedActivities'
import FoodList from './components/foodlist/FoodList'
import FoodMap from './components/foodlist/FoodMap'
import Welcome from './components/welcome/Welcome'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectLogout: false,
      logout: null,
      redirectLogin: false
    }
    this.logout = this.logout.bind(this)
  }

  changeLogin() {
    this.setState({
      logout: false,
      redirectLogin: true
    })
  }

  logout () {
    // You must pass in uid, client, and access-token in the request headers.
    localforage.getItem('appName')
    .then((authInfo) => {
      console.log('logout',authInfo )
      const headers = typeof authInfo === "string" ? JSON.parse(authInfo) : authInfo
      return axios({
        method: 'DELETE',
        url: 'https://project4backend.herokuapp.com/auth/sign_out',
        headers,
      })
    })
    .then(() => {
      localforage.removeItem('appName')
      console.log('logged out')
      this.setState({
        logout: true,
        redirectLogin: false
      })



    })
    .then(() => {
      this.setState({ redirectLogout: true })
      console.log('redirected')
    })
  }

  componentWillMount(){
    localforage.getItem('appName')
    .then((authInfo) => {
      console.log('componentWillMount',authInfo )
      if (authInfo) {
        this.setState({
          logout: false

        })
      } else {
        this.setState({
          logout: true
        })
      }
    })
  }

  render () {
    const { redirectLogout } = this.state
    console.log(localforage.getItem('appName'))

    return (
      <div className='App'>
        <div className='App-header'>
          <h2 id="main-header">doushio~?</h2>
        </div>

        <Router>
        <div className="auth-div">
          { redirectLogout && <Redirect to='/login' /> }

          { this.state.logout &&
          <div>
            <Link to='/login' id='link'><button id="auth-button-login">Login</button></Link>
            <Link to='/signup' id='link'><button id="auth-button">Sign Up</button></Link><br />
          </div>

            // Redirect /home, /activitieshome, /activities, /suggestedactivities,
            // /foodhome, /foodmap, /food to /login
          }

          { this.state.logout === false &&
          <div className="logout">
            <button id="auth-button-logout" onClick={(e) => this.logout(e)}> Log Out </button>
          </div>
          // Redirect /login, /signup to /home
          }
          <br /><br />

          <div>
          <Route path='/login' component={() => <Login redirectLogin={this.state.redirectLogin} logout={this.state.logout} changeLogin= {() => this.changeLogin().bind(this)} />} />
          <Route path='/signup' component={() => <Signup redirectLogin={this.state.redirectLogin} logout={this.state.logout} changeLogin= {() => this.changeLogin().bind(this)} />} />
          <Route exact path='/home' component={() => <Home logout={this.state.logout} /> } />
          </div>

          <div>
          <Route path='/activitieshome' component={() => <ActivitiesHome logout={this.state.logout} /> } />
          <Route path='/activities' component={() => <ActivitiesHome logout={this.state.logout} />} />
          <Route path='/suggestedactivities' component={() => <ActivitiesHome logout={this.state.logout} />} />
          <Route path='/food' component={() => <FoodHome logout={this.state.logout} />} />
          <Route path='/foodhome' component={() => <FoodHome logout={this.state.logout} />} />
          <Route path='/foodmap' component={() => <FoodHome logout={this.state.logout} />} />
          </div>

          <Route exact path='/' render={() => <Welcome />} />
          </div>
        </Router>
      </div>
    )
  }
}

export default App

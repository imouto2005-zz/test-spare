import React from 'react'
import axios from 'axios'
import localforage from 'localforage'
import { Redirect } from 'react-router'

class Signup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirm_password: '',
      redirect: this.props.redirectLogin
    }
    this.handleEmailFormOnChange = this.handleEmailFormOnChange.bind(this)
    this.handlePasswordFormOnChange = this.handlePasswordFormOnChange.bind(this)
    this.handleConfirmPasswordFormOnChange = this.handleConfirmPasswordFormOnChange.bind(this)
    this.signup = this.signup.bind(this)
  }

  signup () {
    const {
      email, password, confirm_password
    } = this.state

    axios.post('https://project4backend.herokuapp.com/auth', {
      email, password, confirm_password
    })
    .then(function (response) {
      localforage.setItem('appName', {
        'access-token': response.headers['access-token'],
        'uid': response.headers.uid,
        'expiry': response.headers.expiry,
        'client': response.headers.client,
        'token-type': response.headers['token-type']
      })
    })
    .then(() => this.setState({ redirect: true }))
    .then(() => {this.props.changeLogin()})
    .catch(function (error) {
      console.log(error)
    })
  }

  handleEmailFormOnChange (e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordFormOnChange (e) {
    this.setState({ password: e.target.value })
  }

  handleConfirmPasswordFormOnChange (e) {
    this.setState({ confirm_password: e.target.value })
  }

  render () {
    const signup = this.signup
    const { redirect } = this.state
    const { logout } = this.props

     if (redirect || logout === false) {
       console.log('redirecting to home')
       return <Redirect to='/home' />
     }

    return (
      <div className="auth-div">
        <h2 id="signup-header">Yay! Sign Up!</h2>
        <img src="http://i.imgur.com/4C3IO96.png" />
        <form onSubmit={(event) => {
          event.preventDefault()
          signup()
        }}>
          <input autoFocus id="auth-input" type='text' placeholder='Email: ' onChange={this.handleEmailFormOnChange} value={this.state.email} />< br />
          <input id="auth-input" type='password' placeholder='Password: (min 8 chars) ' onChange={this.handlePasswordFormOnChange} value={this.state.password} />< br />
          <input id="auth-input" type='password' placeholder='Password Confirmation: ' onChange={this.handleConfirmPasswordFormOnChange} value={this.state.confirm_password} />< br />< br />
          <button id="signup-submit">Submit</button>
        </form>
      </div>
    )
  }

}

export default Signup

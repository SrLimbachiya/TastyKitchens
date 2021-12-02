import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: 'rahul',
    password: 'rahul@2021',
    showErr: false,
    errorMsg: '',
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiBody = {username, password}
    const loginApi = 'https://apis.ccbp.in/login'
    const option = {
      method: 'POST',
      body: JSON.stringify(apiBody),
    }
    const response = await fetch(loginApi, option)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErr: true, errorMsg})
  }

  onUsernameChange = event => {
    this.setState({username: event.target.value})
  }

  onPasswordChange = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {showErr, errorMsg, username, password} = this.state
    const gotCookie = Cookies.get('jwt_token')
    if (gotCookie !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-login">
        <div className="login-form-container">
          <div className="login-form">
            <img
              alt="website login"
              className="web-login-sm"
              src="https://res.cloudinary.com/srlimbachiya/image/upload/v1635959875/KitchensApp/Rectangle_1457_reygkn.png"
            />
            <div>
              <div className="website-logo">
                <img
                  className="web-logo"
                  src="https://res.cloudinary.com/srlimbachiya/image/upload/v1635506555/KitchensApp/Frame_274_iokomb.png"
                  alt="website logo"
                />
                <h1 className="website-name">Tasty Kitchens</h1>
              </div>
            </div>
            <h1>Login</h1>
            <form className="login-form-ele" onSubmit={this.onLogin}>
              <label className="login-labels" htmlFor="usernameInput">
                USERNAME
              </label>
              <input
                onChange={this.onUsernameChange}
                id="usernameInput"
                className="login-inputs"
                type="text"
                value={username}
              />
              <label className="login-labels" htmlFor="passwordInput">
                PASSWORD
              </label>
              <input
                onChange={this.onPasswordChange}
                id="passwordInput"
                className="login-inputs"
                type="password"
                value={password}
              />
              {showErr ? <p className="login-error">{errorMsg}</p> : null}
              <button
                onClick={this.onLogin}
                className="login-btn"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <img
          alt="website login"
          className="login-sidebar"
          src="https://res.cloudinary.com/srlimbachiya/image/upload/v1635505680/KitchensApp/login-sidebar-img_qhgtrn.png"
        />
      </div>
    )
  }
}

export default Login

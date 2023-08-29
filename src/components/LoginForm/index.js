import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onSubmitLoginForm = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitUser = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitLoginForm(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameInput = () => {
    const {username} = this.state
    return (
      <div className="username-input-container">
        <label htmlFor="username" className="username-label">
          Username*
        </label>
        <input
          type="text"
          id="username"
          value={username}
          className="input-box"
          placeholder="Ex-rahul"
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  renderPasswordInput = () => {
    const {password} = this.state
    return (
      <div className="password-input-container">
        <label htmlFor="password" className="password-label">
          Password*
        </label>
        <input
          type="password"
          id="password"
          value={password}
          className="input-box"
          placeholder="Ex-rahul@2021"
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  render() {
    const {errorMsg, showErrorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/ds9bayvoj/image/upload/v1692949146/Rectangle_1467LoginpageImage_ixtttt.jpg"
          alt="login-page-image"
          className="login-lg-image"
        />
        <img
          src="https://res.cloudinary.com/ds9bayvoj/image/upload/v1692954906/Ellipse_99Ellipsse_99_image_wlvm3i.jpg"
          alt="login-page-image"
          className="logo-sm-image"
        />

        <form className="form-container" onSubmit={this.onSubmitUser}>
          <img
            src="https://res.cloudinary.com/ds9bayvoj/image/upload/v1692948949/Group_7731BooKHubLogo_mumfwd.jpg"
            alt="website logo"
            className="logo-image"
          />
          <div className="username-password-container">
            {this.renderUsernameInput()}
            {this.renderPasswordInput()}
            {showErrorMsg && <p className="error-msg">{errorMsg}</p>}
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginForm

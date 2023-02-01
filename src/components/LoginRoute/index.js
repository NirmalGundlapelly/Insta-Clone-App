import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginRoute extends Component {
  state = {username: '', password: '', showErrorMessage: false, errorMsg: ''}

  // On Changing Functions
  onChangeUsername = event => this.setState({username: event.target.value})

  onChangePassword = event => this.setState({password: event.target.value})

  // Submit Success Function
  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  // Submit Failure Function
  onSubmitFailure = errorMsg => {
    this.setState({errorMsg, showErrorMessage: true})
  }

  // On Submit Form
  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMessage, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      // Development Login Page Section

      <div className="login-main-container">
        <div className="responsive-container">
          {/* Large Screen Image */}

          <img
            className="website-login-image"
            alt="website login"
            src="https://res.cloudinary.com/duzcy6kuh/image/upload/v1674922299/Instagram%20Clone%20Images/Layer_2_ge9syp.png"
          />
          {/* Login Form Card */}

          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="logo-container">
              <img
                alt="website logo"
                className="insta-logo"
                src="https://res.cloudinary.com/duzcy6kuh/image/upload/v1675260950/Instagram%20Clone%20Images/Standard_Collection_8_s3fze0.png"
              />
              <h1 className="logo-text">Insta Share</h1>
            </div>
            {/* Input Element Containers */}

            <div className="input-container">
              <label className="label-element" htmlFor="username">
                USERNAME
              </label>
              <input
                value={username}
                onChange={this.onChangeUsername}
                placeholder="Username"
                id="username"
                className="input-element"
                type="text"
              />
            </div>
            <div className="input-container">
              <label className="label-element" htmlFor="password">
                PASSWORD
              </label>
              <input
                value={password}
                onChange={this.onChangePassword}
                placeholder="Password"
                id="password"
                className="input-element"
                type="password"
              />
            </div>
            <div className="button-container">
              <button type="submit" className="login-button">
                Login
              </button>
            </div>
            {showErrorMessage && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute

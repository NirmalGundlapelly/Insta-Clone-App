import {Component} from 'react'
import Cookies from 'js-cookie'

import HeaderComponent from '../HeaderComponent'

import SearchComponent from '../SearchComponent'
import SearchDetailsContext from '../../Context/SearchDetailsContext'

import LoaderComponent from '../ReUsableComponents/LoaderComponent'
import SomethingWentWrong from '../ReUsableComponents/SomethingWentWrong'

import ProfileComponent from '../ProfileComponent'

import './index.css'

const dataFetchStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MyProfileRoute extends Component {
  state = {
    userProfileDetailsFetchStatus: dataFetchStatusConstants.initial,
    userProfileData: {},
  }

  componentDidMount() {
    this.getUserProfileData()
  }

  getUserProfileData = async () => {
    this.setState({
      userProfileDetailsFetchStatus: dataFetchStatusConstants.loading,
    })
    const response = await fetch(
      `https://apis.ccbp.in/insta-share/my-profile`,
      {
        headers: {Authorization: `Bearer ${Cookies.get('jwt_token')}`},
        method: 'GET',
      },
    )
    if (response.ok) {
      const data = await response.json()
      const userProfileData = data.profile

      this.setState({
        userProfileDetailsFetchStatus: dataFetchStatusConstants.success,
        userProfileData,
      })
    }
    if (!response.ok) {
      this.setState({
        userProfileDetailsFetchStatus: dataFetchStatusConstants.failure,
      })
    }
  }

  renderUserProfile = () => {
    const {userProfileDetailsFetchStatus, userProfileData} = this.state
    switch (userProfileDetailsFetchStatus) {
      case dataFetchStatusConstants.loading:
        return (
          <div className="loader-component-container-profile">
            <LoaderComponent />
          </div>
        )
      case dataFetchStatusConstants.success:
        return (
          <>
            <ProfileComponent userProfileData={userProfileData} />
          </>
        )
      case dataFetchStatusConstants.failure:
        return (
          <div className="search-component-failure">
            <SomethingWentWrong retryFunction={this.getUserProfileData} />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <HeaderComponent />

        <SearchDetailsContext.Consumer>
          {value => {
            const {showSearchComponent} = value

            return (
              <>
                {showSearchComponent ? (
                  <>
                    <div>
                      <SearchComponent />
                    </div>
                  </>
                ) : (
                  <>{this.renderUserProfile()}</>
                )}
              </>
            )
          }}
        </SearchDetailsContext.Consumer>
      </div>
    )
  }
}

export default MyProfileRoute

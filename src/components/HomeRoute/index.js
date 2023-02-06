import {Component} from 'react'
import Cookies from 'js-cookie'

import HeaderComponent from '../HeaderComponent'

import LoaderComponent from '../ReUsableComponents/LoaderComponent'
import StoriesComponent from '../StoriesComponent'
import UsersPostsComponent from '../UserPostsComponent'
import FailureView from '../ReUsableComponents/FailureView'
import SearchComponent from '../SearchComponent'
import SearchDetailsContext from '../../Context/SearchDetailsContext'

import './index.css'

const dataFetchStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class HomeRoute extends Component {
  state = {
    storiesFetchStatus: dataFetchStatusConstants.initial,
    userStories: [],
    postsFetchStatus: dataFetchStatusConstants.initial,
    usersPosts: [],
  }

  componentDidMount() {
    this.getUserStories()
    this.getUsersPosts()
  }

  getUserStories = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    this.setState({storiesFetchStatus: dataFetchStatusConstants.loading})
    const response = await fetch(
      'https://apis.ccbp.in/insta-share/stories',
      options,
    )

    if (response.ok) {
      const data = await response.json()
      const userStories = data.users_stories
      this.setState({storiesFetchStatus: dataFetchStatusConstants.success})
      this.setState({userStories})
    }
    if (!response.ok) {
      this.setState({storiesFetchStatus: dataFetchStatusConstants.failure})
    }
  }

  getUsersPosts = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    this.setState({postsFetchStatus: dataFetchStatusConstants.loading})
    const response = await fetch(
      'https://apis.ccbp.in/insta-share/posts',
      options,
    )
    if (response.ok) {
      const data = await response.json()
      const usersPosts = data.posts
      this.setState({postsFetchStatus: dataFetchStatusConstants.success})
      this.setState({usersPosts})
    }
    if (!response.ok) {
      this.setState({postsFetchStatus: dataFetchStatusConstants.failure})
    }
  }

  renderUserStories = () => {
    const {userStories, storiesFetchStatus} = this.state
    switch (storiesFetchStatus) {
      case dataFetchStatusConstants.loading:
        return (
          <div className="stories-loader-component-container">
            <LoaderComponent />
          </div>
        )
      case dataFetchStatusConstants.success:
        return (
          <div className="stories-container">
            <div className="stories-small-display">
              <StoriesComponent
                noOfSlidesToShow={4}
                userStories={userStories}
              />
            </div>
            <div className="stories-large-display">
              <StoriesComponent
                noOfSlidesToShow={7}
                userStories={userStories}
              />
            </div>
          </div>
        )
      case dataFetchStatusConstants.failure:
        return (
          <div className="stories-failure-container ">
            <FailureView retryFunction={this.getUserStories} />
          </div>
        )
      default:
        return null
    }
  }

  renderUsersPosts = () => {
    const {usersPosts, postsFetchStatus} = this.state
    switch (postsFetchStatus) {
      case dataFetchStatusConstants.success:
        return (
          <div className="search-component-with-success-results">
            <ul className="user-posts-container-home">
              {usersPosts.map(eachPost => (
                <UsersPostsComponent
                  key={eachPost.post_id}
                  userPost={eachPost}
                />
              ))}
            </ul>
          </div>
        )
      case dataFetchStatusConstants.loading:
        return (
          <div className="posts-loader-component-container">
            <LoaderComponent />
          </div>
        )
      case dataFetchStatusConstants.failure:
        return (
          <div className="posts-loader-component-container">
            <FailureView retryFunction={this.getUsersPosts} />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <HeaderComponent className="for-header-test" />

        <SearchDetailsContext.Consumer>
          {value => {
            const {showSearchComponent} = value

            return (
              <>
                {showSearchComponent ? (
                  <>
                    <SearchComponent />
                  </>
                ) : (
                  <>
                    {this.renderUserStories()}
                    {this.renderUsersPosts()}
                  </>
                )}
              </>
            )
          }}
        </SearchDetailsContext.Consumer>
      </div>
    )
  }
}

export default HomeRoute

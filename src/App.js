import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import MyProfileRoute from './components/MyProfileRoute'
import UserProfileRoute from './components/UserProfileRoute'
import NotFoundRoute from './components/NotFoundRoute'
import ProtectedRoute from './components/ProtectedRoute'
import SearchDetailsContext from './Context/SearchDetailsContext'

import './App.css'

const dataFetchStatusConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class App extends Component {
  state = {
    showSearchComponent: false,
    searchInputValue: '',
    searchDataFetchStatus: dataFetchStatusConstants.initial,
    usersPosts: [],
    showNavItemsUnderHamburger: false,
  }

  getSearchResults = async () => {
    const {searchInputValue} = this.state
    this.setState({searchDataFetchStatus: dataFetchStatusConstants.loading})
    const response = await fetch(
      `https://apis.ccbp.in/insta-share/posts?search=${searchInputValue}`,
      {
        method: 'GET',
        headers: {Authorization: `Bearer ${Cookies.get('jwt_token')}`},
      },
    )
    if (response.ok) {
      const data = await response.json()
      this.setState({
        searchDataFetchStatus: dataFetchStatusConstants.success,
        usersPosts: data.posts,
      })
    }
    if (!response.ok) {
      this.setState({searchDataFetchStatus: dataFetchStatusConstants.failure})
    }
  }

  changeStatusOfSearchComponent = () => {
    this.setState(
      {
        showSearchComponent: true,
      },
      this.getSearchResults,
    )
  }

  searchComponentOpenSmall = () => {
    this.setState({showSearchComponent: true})
  }

  searchComponentShowStatusChange = () => {
    this.setState({
      showSearchComponent: false,
      searchDataFetchStatus: dataFetchStatusConstants.initial,
      usersPosts: [],
      searchInputValue: '',
    })
  }

  updateSearchInput = eventTargetValueFromHeaderInputField => {
    this.setState({
      searchInputValue: eventTargetValueFromHeaderInputField,
    })
  }

  resetSearchInput = () => {
    this.setState({searchInputValue: ''})
  }

  showOptionsSmall = () => {
    this.setState({showNavItemsUnderHamburger: true})
  }

  closeOptionsSmall = () => {
    this.setState({showNavItemsUnderHamburger: false})
  }

  render() {
    const {
      showSearchComponent,
      searchInputValue,
      searchDataFetchStatus,
      usersPosts,
      showNavItemsUnderHamburger,
    } = this.state

    return (
      <div className="app-page">
        <SearchDetailsContext.Provider
          value={{
            showSearchComponent,
            changeStatusOfSearchComponent: this.changeStatusOfSearchComponent,
            updateSearchInput: this.updateSearchInput,
            searchInputValue,
            searchComponentShowStatusChange: this
              .searchComponentShowStatusChange,
            resetSearchInput: this.resetSearchInput,
            searchDataFetchStatus,
            usersPosts,
            showNavItemsUnderHamburger,
            showOptionsSmall: this.showOptionsSmall,
            closeOptionsSmall: this.closeOptionsSmall,
            searchComponentOpenSmall: this.searchComponentOpenSmall,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginRoute} />
            <ProtectedRoute exact path="/" component={HomeRoute} />
            <ProtectedRoute
              exact
              path="/my-profile"
              component={MyProfileRoute}
            />
            <ProtectedRoute
              exact
              path="/users/:id"
              component={UserProfileRoute}
            />

            <Route exact path="/not-found" component={NotFoundRoute} />
            <Redirect to="/not-found" />
          </Switch>
        </SearchDetailsContext.Provider>
      </div>
    )
  }
}

export default App

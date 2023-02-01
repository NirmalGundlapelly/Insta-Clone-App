import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import InstagramContext from './context/InstagramContext'

// Routes
import LoginRoute from './components/LoginRoute'
import HomeRoute from './components/HomeRoute'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  state = {currentPage: 'HOME', likedVideosIdStatusList: []}

  render() {
    const {currentPage, likedVideosIdStatusList} = this.state
    return (
      <InstagramContext.Provider
        value={{
          currentPage,
          likedVideosIdStatusList,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
        </Switch>
      </InstagramContext.Provider>
    )
  }
}

export default App

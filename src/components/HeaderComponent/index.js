import {GiHamburgerMenu} from 'react-icons/gi'
import {FaSearch} from 'react-icons/fa'
import {Link, withRouter} from 'react-router-dom'
import {IoCloseCircle} from 'react-icons/io5'
import Cookies from 'js-cookie'
import SearchDetailsContext from '../../Context/SearchDetailsContext'

import './index.css'

const HeaderComponent = props => {
  const {match} = props
  const {path} = match

  const selectedPart = 'blue-color-for-selected'
  return (
    <>
      <SearchDetailsContext.Consumer>
        {value => {
          const {
            showSearchComponent,
            changeStatusOfSearchComponent,
            updateSearchInput,
            searchInputValue,
            searchComponentShowStatusChange,
            resetSearchInput,
            showNavItemsUnderHamburger,
            showOptionsSmall,
            closeOptionsSmall,
            searchComponentOpenSmall,
          } = value

          const searchComponentStatusChange = () => {
            changeStatusOfSearchComponent()
          }

          const openSearchComponentSmall = () => {
            searchComponentOpenSmall()
          }

          const intakeSearchInputText = event => {
            updateSearchInput(event.target.value)
          }

          const routingToHomeOrProfile = () => {
            searchComponentShowStatusChange()
          }

          const hamburgerClicked = () => {
            showOptionsSmall()
          }

          const optionsClose = () => {
            closeOptionsSmall()
          }

          const logout = () => {
            const {history} = props
            resetSearchInput()
            searchComponentShowStatusChange()
            Cookies.remove('jwt_token')
            history.replace('/login')
          }

          return (
            <div>
              <nav className="header-nav-container">
                <Link
                  to="/"
                  onClick={routingToHomeOrProfile}
                  className="header-logo-link-container"
                >
                  <div className="header-website-logo-title-container">
                    <img
                      className="header-logo-image"
                      src="https://res.cloudinary.com/duzcy6kuh/image/upload/v1675260950/Instagram%20Clone%20Images/Standard_Collection_8_s3fze0.png"
                      alt="website logo"
                    />
                    <h1 className="header-title">Insta Shar</h1>
                    <span className="animation-letter">e</span>
                  </div>
                </Link>

                <ul className="nav-items-large-display">
                  <li className="search-input-and-button-container">
                    <input
                      className="search-input-field-header"
                      type="search"
                      placeholder="Search Caption"
                      onChange={intakeSearchInputText}
                      value={searchInputValue}
                    />
                    <button
                      className="search-button-header-large"
                      type="button"
                      onClick={searchComponentStatusChange}
                    >
                      <FaSearch />
                    </button>
                  </li>
                  <li>
                    <Link
                      to="/"
                      onClick={routingToHomeOrProfile}
                      className="options-header-large"
                    >
                      <p
                        className={`option-header-text-large scale-effect ${
                          path === '/' && showSearchComponent === false
                            ? selectedPart
                            : null
                        }`}
                      >
                        Home
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-profile"
                      onClick={routingToHomeOrProfile}
                      className="options-header-large"
                    >
                      <p
                        className={`option-header-text-large scale-effect ${
                          path === '/my-profile' &&
                          showSearchComponent === false
                            ? selectedPart
                            : null
                        }`}
                      >
                        Profile
                      </p>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={logout}
                      className="logout-button-large-header"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
                <div className="nav-items-small-display">
                  <button
                    type="button"
                    onClick={hamburgerClicked}
                    className="small-nav-hamburger"
                  >
                    <GiHamburgerMenu />
                  </button>
                </div>
              </nav>
              {showNavItemsUnderHamburger && (
                <ul className="small-display-hamburger-options">
                  <li>
                    <Link
                      to="/"
                      onClick={routingToHomeOrProfile}
                      className="each-option-under-hamburger scale-effect"
                    >
                      <p
                        className={
                          path === '/' && showSearchComponent === false
                            ? selectedPart
                            : null
                        }
                      >
                        Home
                      </p>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={openSearchComponentSmall}
                      className={`hamburger-search-button scale-effect ${
                        showSearchComponent ? selectedPart : null
                      } `}
                    >
                      Search
                    </button>
                  </li>
                  <li>
                    <Link
                      to="/my-profile"
                      onClick={routingToHomeOrProfile}
                      className="each-option-under-hamburger scale-effect"
                    >
                      <p
                        className={
                          path === '/my-profile' &&
                          showSearchComponent === false
                            ? selectedPart
                            : null
                        }
                      >
                        Profile
                      </p>
                    </Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={logout}
                      className="hamburger-logout-option scale-effect"
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={optionsClose}
                      className="close-circle"
                    >
                      <IoCloseCircle />
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )
        }}
      </SearchDetailsContext.Consumer>
    </>
  )
}

export default withRouter(HeaderComponent)

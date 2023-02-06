import HeaderComponent from '../HeaderComponent'
import SearchComponent from '../SearchComponent'
import SearchDetailsContext from '../../Context/SearchDetailsContext'
import UserProfileComponent from '../UserProfileComponent'

const UserProfileRoute = () => (
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
              <UserProfileComponent />
            )}
          </>
        )
      }}
    </SearchDetailsContext.Consumer>
  </div>
)

export default UserProfileRoute

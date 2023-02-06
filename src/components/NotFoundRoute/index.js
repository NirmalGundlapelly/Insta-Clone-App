import './index.css'

const NotFoundRoute = props => {
  const routeToHomePage = () => {
    const {history} = props
    history.push('/')
  }

  return (
    <div className="page-not-found-page">
      <img
        src="https://res.cloudinary.com/duzcy6kuh/image/upload/v1675673906/Instagram%20Clone%20Images/erroring_2_kquv5r.png"
        alt="page not found"
      />
      <h1>Page Not Found</h1>
      <p className="we-are-sorry-text">
        we are sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <button
        className="page-not-found-home-button"
        type="button"
        onClick={routeToHomePage}
      >
        Home Page
      </button>
    </div>
  )
}

export default NotFoundRoute

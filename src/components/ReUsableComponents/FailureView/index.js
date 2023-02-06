import './index.css'

const FailureView = props => {
  const {retryFunction} = props

  const retry = () => {
    retryFunction()
  }

  return (
    <div className="failure-view-container">
      <img
        className="failure-view-image"
        src="https://res.cloudinary.com/duzcy6kuh/image/upload/v1675417864/Instagram%20Clone%20Images/alert-triangle_ggwvif.png"
        alt="failure view"
      />

      <p className="went-wrong-text">Something went wrong. Please try again</p>
      <button className="failure-retry-button" type="button" onClick={retry}>
        Try again
      </button>
    </div>
  )
}

export default FailureView

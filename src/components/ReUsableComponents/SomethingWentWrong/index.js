import './index.css'

const SomethingWentWrong = props => {
  const {retryFunction} = props

  const retryClicked = () => {
    retryFunction()
  }
  return (
    <div className="something-went-wrong-image-container">
      <img
        className="something-went-wrong-image"
        src="https://res.cloudinary.com/duzcy6kuh/image/upload/v1675494413/Instagram%20Clone%20Images/Group_7737_zo50wg.png"
        alt="failure view"
      />
      <p className="something-went-wrong-text">
        Something went wrong. Please try again
      </p>
      <button className="try-again-button" type="button" onClick={retryClicked}>
        Try again
      </button>
    </div>
  )
}

export default SomethingWentWrong

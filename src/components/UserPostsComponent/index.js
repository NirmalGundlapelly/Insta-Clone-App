import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FcLike} from 'react-icons/fc'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import Cookies from 'js-cookie'
import SearchDetailsContext from '../../Context/SearchDetailsContext'
import './index.css'

class UsersPostsComponent extends Component {
  constructor(props) {
    super(props)
    const {userPost} = props
    this.state = {postLikedStatus: false, postLikedCounts: userPost.likes_count}
  }

  likeCLicked = async () => {
    const {userPost} = this.props
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'POST',
      headers: {Authorization: `Bearer ${jwtToken}`},
      body: JSON.stringify({like_status: true}),
    }
    const response = await fetch(
      `https://apis.ccbp.in/insta-share/posts/${userPost.post_id}/like`,
      options,
    )
    console.log(response)
    const data = await response.json()
    console.log(data)

    this.setState(prevState => ({
      postLikedStatus: true,
      postLikedCounts: prevState.postLikedCounts + 1,
    }))
  }

  unlikeCLicked = async () => {
    const {userPost} = this.props
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'POST',
      headers: {Authorization: `Bearer ${jwtToken}`},
      body: JSON.stringify({like_status: false}),
    }
    const response = await fetch(
      `https://apis.ccbp.in/insta-share/posts/${userPost.post_id}/like`,
      options,
    )
    console.log(response)
    const data = await response.json()
    console.log(data)
    this.setState(prevState => ({
      postLikedStatus: false,
      postLikedCounts: prevState.postLikedCounts - 1,
    }))
  }

  render() {
    const {userPost} = this.props
    const postDetails = userPost.post_details
    const {postLikedCounts, postLikedStatus} = this.state

    return (
      <SearchDetailsContext.Consumer>
        {value => {
          const {searchComponentShowStatusChange} = value

          const routingToUserProfile = () => {
            searchComponentShowStatusChange()
          }

          return (
            <li className="each-user-post-container">
              <div className="user-post-profile-container">
                <Link to={`/users/${userPost.user_id}`}>
                  <div className="user-post-profile-image-container scale-effect">
                    <img
                      src={userPost.profile_pic}
                      alt="post author profile"
                      className="user-post-profile-image"
                      title="Profile Picture"
                    />
                  </div>
                </Link>
                <Link
                  className="user-name-link-container scale-effect"
                  to={`/users/${userPost.user_id}`}
                  onClick={routingToUserProfile}
                  title="User Name"
                >
                  <p>{userPost.user_name}</p>
                </Link>
              </div>
              <div className="user-post-image-container">
                <img
                  className="user-post-image"
                  src={postDetails.image_url}
                  alt="post"
                />
              </div>
              <div className="action-buttons-container">
                {!postLikedStatus ? (
                  <button
                    className="like-dis-comment-share-button scale-effect"
                    type="button"
                    onClick={this.likeCLicked}
                    title="Like"
                    // testid="likeIcon"
                  >
                    <BsHeart />
                  </button>
                ) : (
                  <button
                    className="like-dis-comment-share-button scale-effect"
                    onClick={this.unlikeCLicked}
                    type="button"
                    title="Liked"
                    // testid="unLikeIcon"
                  >
                    <FcLike />
                  </button>
                )}
                <button
                  className="like-dis-comment-share-button scale-effect"
                  type="button"
                  title="Comments"
                >
                  <FaRegComment />
                </button>
                <button
                  className="like-dis-comment-share-button scale-effect"
                  type="button"
                  title="Share"
                >
                  <BiShareAlt />
                </button>
              </div>
              <p className="likes-text">{postLikedCounts} likes</p>
              <p className="caption-comments-text">{postDetails.caption}</p>
              <ul className="comments-container">
                {userPost.comments.map(eachComment => (
                  <li key={eachComment.user_id}>
                    <p className="caption-comments-text">
                      <span className="commented-user-name">
                        {eachComment.user_name}
                      </span>
                      {eachComment.comment}
                    </p>
                  </li>
                ))}
              </ul>
              <p className="post-created-moment">{userPost.created_at}</p>
            </li>
          )
        }}
      </SearchDetailsContext.Consumer>
    )
  }
}
export default UsersPostsComponent

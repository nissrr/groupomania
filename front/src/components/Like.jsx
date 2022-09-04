import { useState } from 'react'
import useAuth from '../utils/hooks/useAuth'
import { doFetch } from '../utils/functions/doFetch'
import { CONTENT as TEXT } from '../../public/assets/texts/texts'

export function Like({ likes, user_like_posts, id, needReRender }) {
  const { userDetails } = useAuth()
  const [postLikes, setPostLikes] = useState(likes)
  const [userLikedThisPost, setUserLikedThisPost] = useState(
    user_like_posts.some(user => user.user_id === userDetails.userId)
  )
  const handleMouseOver = () => {}
  const handleClick = () => {
    const likeFetchBody = { like: userLikedThisPost ? 0 : 1 }
    doFetch({
      method: 'POST',
      url: `http://localhost:3000/api/posts/${id}/like`,
      body: likeFetchBody,
      token: userDetails.token,
      isMultipartFormData: false,
    })
    setUserLikedThisPost(!userLikedThisPost)
    userLikedThisPost
      ? setPostLikes(postLikes - 1)
      : setPostLikes(postLikes + 1)
    needReRender()
  }
  const LikeText = () => {
    if (userLikedThisPost)
      return <p className="post__action--text unlike">{TEXT.UNLIKE}</p>
    return <p className="post__action--text like">{TEXT.LIKE}</p>
  }
  return (
    <div
      className={userLikedThisPost ? 'post__like liked' : 'post__like'}
      onMouseOver={handleMouseOver}
      onClick={handleClick}
    >
      <svg className="post__like--heart" viewBox="0 0 24 24">
        <use href="#heart" />
      </svg>
      {postLikes > 0 && <span className="post__like--number">{postLikes}</span>}
      <LikeText />
    </div>
  )
}

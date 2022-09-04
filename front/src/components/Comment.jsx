import { useState } from 'react'
import { UserName } from '../utils/Atoms/UserName'
import './styles/Comment.css'
import useAuth from '../utils/hooks/useAuth'
import { doFetch } from '../utils/functions/doFetch'
import { CreateComment } from './CreateComment'
import { DisplayContent } from './DisplayContent'
import { CONTENT as TEXT } from '../../public/assets/texts/texts'
import { AuthorActions } from './AuthorActions'
import { DeleteConfirmationMessage } from './DeleteConfirmationMessage'

export function Comment({
  comment,
  index,
  commentNeedReRender,
  commentsNumber,
  setCommentsNumber,
}) {
  const { userDetails } = useAuth()
  const [commentLikes, setCommentLikes] = useState(comment.likes)
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false)
  const [isModifyActive, setModifyActive] = useState(false)
  const [userLikedThisComment, setUserLikedThisComment] = useState(
    comment.user_like_comments.some(user => user.userId === userDetails.userId)
  )
  const [error, setError] = useState(false)
  const animationDelay = (index + 1) * 150

  const handleLike = async () => {
    const likeFetchBody = { like: userLikedThisComment ? 0 : 1 }
    const { error } = await doFetch({
      method: 'POST',
      url: `http://localhost:3000/api/posts/${comment.postId}/comment/${comment.id}/like`,
      body: likeFetchBody,
      token: userDetails.token,
      isMultipartFormData: false,
    })
    if (!error) {
      setUserLikedThisComment(!userLikedThisComment)
      userLikedThisComment
        ? setCommentLikes(commentLikes - 1)
        : setCommentLikes(commentLikes + 1)
      commentNeedReRender()
    }
    if (error) setError(error)
  }
  const handleDeleteComment = async () => {
    const { error } = await doFetch({
      method: 'DELETE',
      url: `http://localhost:3000/api/posts/${comment.postId}/comment/${comment.id}`,
      token: userDetails.token,
      isMultipartFormData: false,
    })
    if (!error) {
      setCommentsNumber(commentsNumber - 1)
      commentNeedReRender()
    }
    if (error) setError(error)
  }

  if(error) return <DisplayError />

  return (
    <div className="comment" style={{ animationDelay: `${animationDelay}ms` }}>
      <div className="comment-content">
        <div className="comment-content__user">
          <UserName user={comment.user} isShowingDepartement={false} />
        </div>
        {isModifyActive ? (
          <CreateComment
            postId={comment.postId}
            comment={comment}
            commentNeedReRender={commentNeedReRender}
            setModifyActive={setModifyActive}
            onBlur={() => setModifyActive(false)}
          />
        ) : (
          <>
            <DisplayContent data={comment} />
            {commentLikes > 0 && (
              <div className="comment-content__likes" onClick={handleLike}>
                <svg
                  className="comment-content__likes--heart"
                  viewBox="0 0 24 24"
                >
                  <use href="#heart" />
                </svg>
                <span>{commentLikes}</span>
              </div>
            )}
          </>
        )}
      </div>
      <div className="comment-actions">
        <div onClick={handleLike}>
          {userLikedThisComment ? TEXT.UNLIKE : TEXT.LIKE}
        </div>
        {(userDetails.userId === comment.userId ||
          userDetails.role === 'admin') && (
          <AuthorActions
            data={comment}
            modifyButtonOnClick={() => setModifyActive(!isModifyActive)}
            deleteButtonOnClick={() =>
              setShowConfirmationMessage(!showConfirmationMessage)
            }
          />
        )}
      </div>
      {showConfirmationMessage && (
        <DeleteConfirmationMessage
          data={comment}
          handleDelete={handleDeleteComment}
          setShowConfirmationMessage={setShowConfirmationMessage}
        />
      )}
    </div>
  )
}

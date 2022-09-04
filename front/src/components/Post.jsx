import './styles/Post.css'
import { Like } from './Like.jsx'
import { UserName } from '../utils/Atoms/UserName'
import useAuth from '../utils/hooks/useAuth'
import { useState } from 'react'
import { doFetch } from '../utils/functions/doFetch'
import { CreatePost as ModifyPost } from './CreatePost'
import { useNavigate } from 'react-router-dom'
import { DisplayError } from '../utils/Atoms/DisplayError'
import { Comments } from './Comments'
import { DisplayContent } from './DisplayContent'
import { CONTENT as TEXT } from '../../public/assets/texts/texts'
import { AuthorActions } from './AuthorActions'
import { DeleteConfirmationMessage } from './DeleteConfirmationMessage'

export function Post({ post, index, needReRender, commentNeedReRender }) {
  const { userDetails } = useAuth()
  const navigate = useNavigate()
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false)
  const [showAllUserLike, setShowAllUserLike] = useState(false)
  const [isModifyActive, setModifyActive] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [commentsNumber, setCommentsNumber] = useState(post.commentsNumber)
  const [error, setError]=useState(false)
  const animationDelay = (index + 1) * 200

  const handleDeletePost = async () => {
    const { error } = await doFetch({
      method: 'DELETE',
      url: `http://localhost:3000/api/posts/${post.id}`,
      token: userDetails.token,
      isMultipartFormData: false,
    })
    error ? setError(error) : needReRender()
  }
  const DisplayUsersWhoLikes = () => {
    return post.user_like_posts.map((like, index) => {
      return (
        <span key={`userlike-${index}`}>
          {index > 0 && <span>, </span>}
          <span className="post__text--userlikes--name">
            <UserName user={like.user} isShowingDepartement={false} />
          </span>
        </span>
      )
    })
  }

  if(error) return <DisplayError />

  return (
    <div className="post" style={{ animationDelay: `${animationDelay}ms` }}>
      <div
        className="post__user"
        onClick={() => navigate(`/profile/${post.userId}`)}
      >
        <UserName user={post.user} isShowingDepartement={true} />
        <div>
          {new Date(post.date).toLocaleString('fr', {
            timeStyle: 'medium',
            dateStyle: 'full',
          })}
        </div>
      </div>
      {isModifyActive ? (
        <ModifyPost
          post={post}
          needReRender={needReRender}
          setModifyActive={setModifyActive}
          onBlur={() => setModifyActive(false)}
        />
      ) : (
        <DisplayContent data={post} />
      )}
      <div className="post__likes-comments-container post__text">
        {post.user_like_posts.length > 0 && (
          <p
            className={
              showAllUserLike
                ? 'post__text--userlikes'
                : 'post__text--userlikes post__text--userlikes--inOneLign'
            }
            onClick={() => setShowAllUserLike(!showAllUserLike)}
          >
            {TEXT.LIKED_BY}
            <DisplayUsersWhoLikes />
          </p>
        )}
        <p
          className="post__text--comments"
          onClick={() => setShowComments(!showComments)}
        >
          {commentsNumber <= 1
            ? `${commentsNumber} ${TEXT.COMMENT}`
            : `${commentsNumber} ${TEXT.COMMENTS}`}
        </p>
      </div>

      <div className="post__footer">
        <Like
          likes={post.likes}
          user_like_posts={post.user_like_posts}
          id={post.id}
          needReRender={needReRender}
        />
        <div
          className="post__action"
          onClick={() => setShowComments(!showComments)}
        >
          <div className="post__action--icon">
            <svg viewBox="0 0 24 24">
              <use href="#comment" />
            </svg>
          </div>
          {post.commentsNumber > 0 && <span className="post__like--number">{post.commentsNumber}</span>}
          <p className="post__action--text">{TEXT.COMMENT_BUTTON}</p>
        </div>
        {(userDetails.userId === post.userId ||
          userDetails.role === 'admin') && (
          <AuthorActions
            data={post}
            modifyButtonOnClick={() => setModifyActive(!isModifyActive)}
            deleteButtonOnClick={() =>
              setShowConfirmationMessage(!showConfirmationMessage)
            }
          />
        )}
      </div>
      {showComments && (
        <Comments
          postId={post.id}
          commentNeedReRender={commentNeedReRender}
          commentsNumber={commentsNumber}
          setCommentsNumber={setCommentsNumber}
        />
      )}
      {showConfirmationMessage && (
        <DeleteConfirmationMessage
          data={post}
          handleDelete={handleDeletePost}
          setShowConfirmationMessage={setShowConfirmationMessage}
        />
      )}
    </div>
  )
}

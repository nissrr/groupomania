import { CONTENT as TEXT } from '../../public/assets/texts/texts'
import './styles/Post.css'

export function DeleteConfirmationMessage({
  data,
  handleDelete,
  setShowConfirmationMessage,
}) {
  const isComment = data.postId ? true : false
  return (
    <div
      className="post__confirmation-message"
      style={{ inset: isComment ? '5%' : '10%' }}
    >
      <p className="post__confirmation-message__text">
        {TEXT.CONFIRM_DELETE_POST}
      </p>
      <div className="post__confirmation-message__response">
        <button className="accent" onClick={e => handleDelete(e)}>
          {TEXT.CONFIRM_DELETE_YES}
        </button>
        <button
          className="accent"
          onClick={() => setShowConfirmationMessage(false)}
        >
          {TEXT.CONFIRM_DELETE_NO}
        </button>
      </div>
    </div>
  )
}

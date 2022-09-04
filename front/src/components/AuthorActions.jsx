import { CONTENT as TEXT } from '../../public/assets/texts/texts'

export function AuthorActions({
  data,
  modifyButtonOnClick,
  deleteButtonOnClick,
}) {
  const isPost = data.postId ? false : true
  return (
    <>
      <div
        className={isPost ? 'post__action' : undefined}
        onClick={modifyButtonOnClick}
      >
        {isPost && (
          <div className="post__action--icon">
            <svg viewBox="0 0 24 24">
              <use href="#pen" />
            </svg>
          </div>
        )}
        <p className={isPost ? 'post__action--text modify' : undefined}>
          {TEXT.MODIFY_BUTTON}
        </p>
      </div>
      <div
        className={isPost ? 'post__action' : undefined}
        onClick={deleteButtonOnClick}
      >
        {isPost && (
          <div className="post__action--icon">
            <svg viewBox="0 0 24 24">
              <use href="#trash" />
            </svg>
          </div>
        )}
        <p className={isPost ? 'post__action--text delete' : undefined}>
          {TEXT.DELETE_BUTTON}
        </p>
      </div>
    </>
  )
}

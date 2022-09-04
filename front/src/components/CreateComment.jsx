import { useState } from 'react'
import useAuth from '../utils/hooks/useAuth'
import { doFetch } from '../utils/functions/doFetch'
import { DisplayError } from '../utils/Atoms/DisplayError'
import useComponentVisible from '../utils/hooks/useComponentVisible'
import './styles/CreatePost.css'
import { CancelButton } from './CancelButton'
import { CREATE_COMMENT as TEXT } from '../../public/assets/texts/texts'
import { AltTextExplanation } from './AltTextExplanation'

export function CreateComment({
  postId,
  comment,
  commentNeedReRender,
  setModifyActive,
  commentsNumber,
  setCommentsNumber,
}) {
  const { userDetails } = useAuth()
  const [isEmptyComment, setEmptyComment] = useState(comment ? false : true)
  const [textValue, setTextValue] = useState(comment ? comment.text : '')
  const [altTextValue, setAltText] = useState(comment ? comment.altText : '')
  const [file, setFile] = useState(false)
  const [displayAltExplanation, setAltExplanation] = useState(false)
  const [imageUrl, setImageUrl] = useState(comment ? comment.imageUrl : null)
  const {
    ref,
    isComponentVisible: isAnError,
    setIsComponentVisible: setError,
  } = useComponentVisible(true)

  const handleText = e => {
    setTextValue(e.target.value)
    e.target.value ? setEmptyComment(false) : !imageUrl && setEmptyComment(true)
  }
  const handleAddImage = e => {
    setFile(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
    setEmptyComment(false)
  }
  const handleDeleteImage = () => {
    setFile(false)
    setImageUrl(null)
    textValue === '' && setEmptyComment(true)
  }
  const handleSubmit = async (e, method) => {
    e.preventDefault()
    const urlPath = comment ? comment.id : ''
    let data = {
      text: textValue,
      imageUrl: comment ? imageUrl : undefined,
      altText: altTextValue,
    }
    let isMultipartFormData = false
    if (file) {
      isMultipartFormData = true
      data = new FormData()
      data.append(
        'post',
        JSON.stringify({ text: textValue, altText: altTextValue })
      )
      data.append('image', file)
    }
    const { error } = await doFetch({
      method: method,
      url: `http://localhost:3000/api/posts/${postId}/comment/${urlPath}`,
      body: data,
      token: userDetails.token,
      isMultipartFormData: isMultipartFormData,
    })
    if (comment && !error) setModifyActive(false)
    if (!comment) {
      setCommentsNumber(commentsNumber + 1)
    }
    setFile(false)
    setTextValue('')
    setAltText('')
    setImageUrl(null)
    setEmptyComment(true)
    error ? setError(error) : commentNeedReRender()
  }
  return (
    <form className={comment ? 'modify-comment' : 'create-comment'} ref={ref}>
      {isAnError && (
        <DisplayError message={isAnError} setError={setError} ref={ref} />
      )}
      {displayAltExplanation && (
        <AltTextExplanation handleCancel={() => setAltExplanation(false)} />
      )}
      {comment && (
        <>
          <h3>{TEXT.MODIFY_TITLE}</h3>
          <CancelButton handleClick={() => setModifyActive(false)} />
        </>
      )}
      {(file || imageUrl) && (
        <div className="create-post__image--container">
          <output
            htmlFor={
              comment
                ? `update-comment-${comment.id}__actions--image-input`
                : `create-coment__actions--image-input-${postId}`
            }
            className="create-post__image"
          >
            <img src={imageUrl} />
            <CancelButton handleClick={handleDeleteImage} />
            <div className="create-post__image--altText">
              <input
                placeholder={TEXT.ALT_TEXT_PLACEHOLDER}
                aria-label={TEXT.ALT_TEXT_LABEL}
                value={altTextValue}
                onChange={e => setAltText(e.target.value)}
              />
              <button
                onClick={e => {
                  e.preventDefault()
                  setAltExplanation(true)
                }}
              >
                <svg viewBox="0 0 24 24">
                  <use href="#info-circle" />
                </svg>
              </button>
            </div>
          </output>
        </div>
      )}
      <div className="create-comment__text-actions">
        <div
          className="create-post__grow-wrap create-comment__textarea"
          data-replicated-value={textValue}
        >
          <textarea
            name="create-post"
            id="create-post"
            onInput={e => handleText(e)}
            placeholder={TEXT.TEXTAREA_PLACEHOLDER}
            aria-label={
              textValue.length === 0 ? TEXT.TEXTAREA_PLACEHOLDER : textValue
            }
            value={textValue}
          ></textarea>
        </div>
        <div className="create-post__actions">
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.gif,.webp"
            id={
              comment
                ? `update-comment-${comment.id}__actions--image-input`
                : `create-coment__actions--image-input-${postId}`
            }
            onInput={e => handleAddImage(e)}
          />
          <label
            htmlFor={
              comment
                ? `update-comment-${comment.id}__actions--image-input`
                : `create-coment__actions--image-input-${postId}`
            }
            className="create-post__actions--image"
          >
            <svg viewBox="0 0 24 24" aria-label={TEXT.ADD_IMAGE}>
              <use href="#image-logo" />
            </svg>
          </label>
          <button
            className={isEmptyComment ? 'accent inactive' : 'accent'}
            type="submit"
            disabled={isEmptyComment ? true : false}
            onClick={e => {
              handleSubmit(e, comment ? 'PUT' : 'POST')
            }}
          >
            {comment ? TEXT.MODIFY_BUTTON : TEXT.COMMENT_BUTTON}
          </button>
        </div>
      </div>
    </form>
  )
}

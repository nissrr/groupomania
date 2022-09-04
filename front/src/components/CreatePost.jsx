import { useState } from 'react'
import useAuth from '../utils/hooks/useAuth'
import { doFetch } from '../utils/functions/doFetch'
import './styles/CreatePost.css'
import './styles/Login.css'
import './styles/Post.css'
import { DisplayError } from '../utils/Atoms/DisplayError'
import useComponentVisible from '../utils/hooks/useComponentVisible'
import { CREATE_POST as TEXT } from '../../public/assets/texts/texts'
import { CancelButton } from './CancelButton'
import { AltTextExplanation } from './AltTextExplanation'

export function CreatePost({ post, needReRender, setModifyActive }) {
  const { userDetails } = useAuth()
  const [isEmptyPost, setEmptyPost] = useState(post ? false : true)
  const [textValue, setTextValue] = useState(post ? post.text : '')
  const [altTextValue, setAltText] = useState(post ? post.altText : undefined)
  const [file, setFile] = useState(false)
  const [displayAltExplanation, setAltExplanation] = useState(false)
  const [imageUrl, setImageUrl] = useState(post ? post.imageUrl : null)
  const {
    ref,
    isComponentVisible: isAnError,
    setIsComponentVisible: setError,
  } = useComponentVisible(true)

  const handleText = e => {
    setTextValue(e.target.value)
    e.target.value ? setEmptyPost(false) : !imageUrl && setEmptyPost(true)
  }
  const handleAddImage = e => {
    setFile(e.target.files[0])
    setImageUrl(URL.createObjectURL(e.target.files[0]))
    setEmptyPost(false)
  }
  const handleDeleteImage = () => {
    setFile(false)
    setImageUrl(null)
    textValue === '' && setEmptyPost(true)
  }
  const handleSubmit = async (e, method) => {
    e.preventDefault()
    const urlPath = post ? post.id : ''
    let data = {
      text: textValue,
      imageUrl: post ? imageUrl : null,
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
      url: `http://localhost:3000/api/posts/${urlPath}`,
      body: data,
      token: userDetails.token,
      isMultipartFormData: isMultipartFormData,
    })
    if (post && !error) setModifyActive(false)
    setFile(false)
    setTextValue('')
    setAltText('')
    setImageUrl(null)
    setEmptyPost(true)
    error ? setError(error) : needReRender()
  }

  return (
    <form className="create-post" ref={ref}>
      {isAnError && (
        <DisplayError message={isAnError} setError={setError} ref={ref} />
      )}
      {displayAltExplanation && <AltTextExplanation handleCancel={()=>setAltExplanation(false)} />}
      {post && (
        <>
          <h3>{TEXT.MODIFY_TITLE}</h3>
          <CancelButton handleClick={() => setModifyActive(false)} />
        </>
      )}
      {(file || imageUrl) && (
        <div className="create-post__image--container">
          <output
            htmlFor={
              post
                ? `update-post-${post.id}__actions--image-input`
                : 'create-post__actions--image-input'
            }
            className="create-post__image"
          >
            <img src={imageUrl} />
            <CancelButton handleClick={handleDeleteImage} />
          </output>
          <div className="create-post__image--altText">
            <input
              placeholder={TEXT.ALT_TEXT_PLACEHOLDER}
              aria-label={TEXT.ALT_TEXT_LABEL}
              value={altTextValue}
              onChange={e => setAltText(e.target.value)}
            />
            <button onClick={(e)=>{e.preventDefault(); setAltExplanation(true)}}>
              <svg viewBox="0 0 24 24">
                <use href="#info-circle" />
              </svg>
            </button>
          </div>
        </div>
      )}
      <div className="create-post__grow-wrap" data-replicated-value={textValue}>
        <textarea
          name="create-post"
          id="create-post"
          onInput={e => handleText(e)}
          placeholder={
            post
              ? TEXT.TEXTAREA_PLACEHOLDER_POST
              : TEXT.TEXTAREA_PLACEHOLDER_NO_POST
          }
          aria-label={
            post
              ? TEXT.TEXTAREA_PLACEHOLDER_POST
              : TEXT.TEXTAREA_PLACEHOLDER_NO_POST
          }
          value={textValue}
        ></textarea>
      </div>
      <div className="create-post__actions">
        <input
          type="file"
          accept=".jpg,.jpeg,.png,.gif,.webp"
          id={
            post
              ? `update-post-${post.id}__actions--image-input`
              : 'create-post__actions--image-input'
          }
          onInput={e => handleAddImage(e)}
        />
        <label
          htmlFor={
            post
              ? `update-post-${post.id}__actions--image-input`
              : 'create-post__actions--image-input'
          }
          className="create-post__actions--image"
        >
          <p className="create-post__actions--image--text">{TEXT.ADD_IMAGE}</p>
          <svg viewBox="0 0 24 24">
            <use href="#image-logo" />
          </svg>
        </label>
        <button
          className={isEmptyPost ? 'accent inactive' : 'accent'}
          type="submit"
          disabled={isEmptyPost ? true : false}
          onClick={e => {
            handleSubmit(e, post ? 'PUT' : 'POST')
          }}
        >
          {post ? TEXT.MODIFY_BUTTON : TEXT.POST_BUTTON}
        </button>
      </div>
    </form>
  )
}

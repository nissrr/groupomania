import { useState } from 'react'
import { EMAIL_INPUT as TEXT } from '../../public/assets/texts/texts'
import { REGEXP } from '../utils/regexp'

export function EmailInput({
  email,
  setEmail,
  isLoginActive,
  isAnErrorInMail,
  setIsAnErrorInMail,
  setErrorMessage,
}) {
  const [isOnFocus, setIsOnFocus] = useState(false)

  const handleEmailInput = value => {
    setErrorMessage()
    setEmail(value)
    !REGEXP.EMAIL.test(value)
      ? setIsAnErrorInMail(true)
      : setIsAnErrorInMail(false)
  }
  const EmailMessage = () => {
    if (isAnErrorInMail)
      return <span className="error-message">{TEXT.ERROR}</span>
    return <span className="success-message">{TEXT.SUCCESS}</span>
  }
  return (
    <>
      <input
        id="email"
        type="email"
        value={email}
        onChange={e => handleEmailInput(e.target.value)}
        onFocus={() => setIsOnFocus(true)}
        pattern={REGEXP.EMAIL}
        placeholder={!isLoginActive ? TEXT.PLACEHOLDER : undefined}
        required
      />
      {!isLoginActive && isOnFocus && email.length !== 0 && <EmailMessage />}
    </>
  )
}

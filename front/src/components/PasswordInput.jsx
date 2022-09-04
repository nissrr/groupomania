import { useState } from 'react'
import { PASSWORD_INPUT as TEXT } from '../../public/assets/texts/texts'
import { REGEXP } from '../utils/regexp'

export function PasswordInput({
  password,
  setPassword,
  isLoginActive,
  isAnErrorInPassword,
  setIsAnErrorInPassword,
}) {
  const [isOnFocus, setIsOnFocus] = useState(false)
  const [isMoreThanEightChar, setIsMoreThanEightChar] = useState(false)
  const [isHaveUppercase, setIsHaveUppercase] = useState(false)
  const [isHaveLowercase, setIsHaveLowercase] = useState(false)
  const [isHaveTwoDigits, setIsHaveTwoDigits] = useState(false)
  const [isHaveSpecialChar, setIsHaveSpecialChar] = useState(false)
  const [hidePassword, setHidePassword] = useState(true)

  const handlepasswordInput = value => {
    setPassword(value)
    !REGEXP.WHOLEPASSWORD.test(value)
      ? setIsAnErrorInPassword(true)
      : setIsAnErrorInPassword(false)
    !REGEXP.MORE_THAN_EIGHT_CHAR.test(value)
      ? setIsMoreThanEightChar(true)
      : setIsMoreThanEightChar(false)
    !REGEXP.HAVE_UPPERCASE.test(value)
      ? setIsHaveUppercase(true)
      : setIsHaveUppercase(false)
    !REGEXP.HAVE_LOWERCASE.test(value)
      ? setIsHaveLowercase(true)
      : setIsHaveLowercase(false)
    !REGEXP.HAVE_TWO_DIGITS.test(value)
      ? setIsHaveTwoDigits(true)
      : setIsHaveTwoDigits(false)
    !REGEXP.HAVE_SPECIAL_CHAR.test(value)
      ? setIsHaveSpecialChar(true)
      : setIsHaveSpecialChar(false)
  }
  const DisplayMessage = ({ state, text }) => {
    if (state) return <span className="error-message">{TEXT[text].ERROR}</span>
    return <span className="success-message">{TEXT[text].SUCCESS}</span>
  }
  const ErrorMessage = () => {
    return (
      <>
        <DisplayMessage
          state={isMoreThanEightChar}
          text={'MORE_THAN_EIGHT_CHAR'}
        />
        <DisplayMessage state={isHaveUppercase} text={'HAVE_UPPERCASE'} />
        <DisplayMessage state={isHaveLowercase} text={'HAVE_LOWERCASE'} />
        <DisplayMessage state={isHaveTwoDigits} text={'HAVE_TWO_DIGITS'} />
        <DisplayMessage state={isHaveSpecialChar} text={'HAVE_SPECIAL_CHAR'} />
      </>
    )
  }
  const IsThereAnErrorInPassword = () => {
    if (isAnErrorInPassword) return <ErrorMessage />
    return <span className="success-message">{TEXT.WHOLEPASSWORD.SUCCESS}</span>
  }
  const EyeIcon = () => {
      return (
        <svg viewBox="0 0 24 24" onClick={()=>setHidePassword(!hidePassword)}>
          <use href={hidePassword ? "#eye" : "#eye-off"} />
        </svg>
      )
  }

  return (
    <>
      <div className="password-input">
        <input
          id="password"
          type={hidePassword ? "password" : "text"}
          value={password}
          onChange={e => handlepasswordInput(e.target.value)}
          onFocus={() => setIsOnFocus(true)}
          pattern={REGEXP.WHOLEPASSWORD}
          placeholder={!isLoginActive ? TEXT.PLACEHOLDER : undefined}
          required
        />
        <EyeIcon />
      </div>
      {!isLoginActive && isOnFocus && <IsThereAnErrorInPassword />}
    </>
  )
}

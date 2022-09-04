import { Login } from '../components/Login'
import './styles/LoginPage.css'

export function LoginPage() {
  return (
    <>
      <header>
        <h1 className="loginpage-logo">
          <img
            src='/assets/icon-left-font-light.svg'
            className="loginpage-logo-image"
            alt="Groupomania Social Network"
          />
        </h1>
      </header>
      <Login />
    </>
  )
}

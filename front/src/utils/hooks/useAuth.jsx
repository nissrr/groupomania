import { createContext, useContext, useState } from 'react'

const authContext = createContext()

function useAuth() {
  const [authed, setAuthed] = useState(false)
  const [userDetails, setUserDetails] = useState({})
  const [errorMessage, setErrorMessage] = useState()


  async function fetchApiAuth(route, email, password) {
    return fetch(`http://localhost:3000/api/auth/${route}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    })
  }
  return {
    authed,
    userDetails,
    errorMessage,
    setErrorMessage,
    async login(email, password) {
      try {
        const response = await fetchApiAuth('login', email, password)
        const data = await response.json()
        localStorage.setItem('token', data.token)
        if (localStorage.getItem('token')) {
          setAuthed(true)
          setUserDetails(data)
          setErrorMessage()
        }
        if (data.error) {
          setAuthed(false)
          setErrorMessage(data.error)
        }
        return data
      } catch (error) {
        return { error }
      }
    },
    async signup(email, password) {
      try {
        const response = await fetchApiAuth('signup', email, password)
        const data = await response.json()
        if (data.message) {
          setErrorMessage()
        }
        if (data.error) {
          setAuthed(false)
          setErrorMessage(data.error)
        }
        return data
      } catch (error) {
        return { error }
      }
    },
    logout() {
      setAuthed(false)
      setUserDetails()
      localStorage.clear()
      return
    },
  }
}

export function AuthProvider({ children }) {
  const auth = useAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}
export default function AuthConsumer() {
  return useContext(authContext)
}

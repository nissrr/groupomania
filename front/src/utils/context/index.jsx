import { createContext, useState } from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export const RequireAuth = ({ children }) => {
  const { authed } = useAuth()

  return authed === true ? children : <Navigate to="/" replace />
}

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const userPreferesDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
  const [theme, setTheme] = useState(userPreferesDarkTheme?'dark':'light')
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

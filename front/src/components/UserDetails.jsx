import useAuth from '../utils/hooks/useAuth'
import { useEffect, useState } from 'react'
import { doFetch } from '../utils/functions/doFetch'
import './styles/Login.css'
import './styles/UserDetails.css'
import { DisplayError } from '../utils/Atoms/DisplayError'
import { Loader } from './Loader'
import { USER_DETAILS as TEXT } from '../../public/assets/texts/texts'

export function UserDetails({ userId }) {
  const { userDetails } = useAuth()
  const [isModifyActive, setModifyActive] = useState(false)
  const [userData, setUserData] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  useEffect(() => {
    const fetchUserData = async () => {
      const { data, isLoading, error } = await doFetch({
        method: 'GET',
        url: `http://localhost:3000/api/users/${userId}`,
        token: userDetails.token,
      })
      setUserData(data)
      setLoading(isLoading)
      setError(error)
    }
    fetchUserData()
  }, [userId])
  const handleSubmit = async e => {
    e.preventDefault()
    const { error } = await doFetch({
      method: 'PUT',
      url: `http://localhost:3000/api/users/${userId}`,
      body: userData,
      token: userDetails.token,
    })
    if(error) setError(error)
    setModifyActive(false)
  }
  const DisplayUserData = ({data}) => {
    if(data) return <span>{data}</span>
    return <span className="user-details__no-data">{TEXT.NO_DATA}</span>
  }

  if (error) return <DisplayError />

  if (isLoading) return <Loader />

  return (
    <>
      <form className="user-details">
        <h2>
          {userDetails.userId === parseInt(userId)
            ? TEXT.MY_PROFILE
            : TEXT.THEIR_PROFILE}
        </h2>
        <div>
          <p>{TEXT.EMAIL}</p>
          {isModifyActive ? (
            <input
              aria-label={TEXT.EMAIL}
              id="email"
              value={userData.email}
              type="email"
              required
              onChange={e =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          ) : (
            <span>{userData.email}</span>
          )}
        </div>
        <div>
          <p>{TEXT.FISRT_NAME}</p>
          {isModifyActive ? (
            <input
              aria-label={TEXT.FISRT_NAME}
              id="first-name"
              value={userData.firstName ?? ''}
              placeholder={TEXT.NO_DATA}
              type="text"
              onChange={e =>
                setUserData({ ...userData, firstName: e.target.value })
              }
            />
          ) : (
            <DisplayUserData data={userData.firstName} />
          )}
        </div>
        <div>
          <p>{TEXT.NAME}</p>
          {isModifyActive ? (
            <input
              aria-label={TEXT.NAME}
              id="name"
              value={userData.name ?? ''}
              placeholder={TEXT.NO_DATA}
              type="text"
              onChange={e => setUserData({ ...userData, name: e.target.value })}
            />
          ) : (
            <DisplayUserData data={userData.name} />
          )}
        </div>
        <div>
          <p>{TEXT.DEPARTEMENT}</p>
          {isModifyActive ? (
            <input
              aria-label={TEXT.DEPARTEMENT}
              id="departement"
              value={userData.departement ?? ''}
              placeholder={TEXT.NO_DATA}
              type="text"
              onChange={e =>
                setUserData({ ...userData, departement: e.target.value })
              }
            />
          ) : (
            <DisplayUserData data={userData.departement} />
          )}
        </div>
        <div className="user-details__buttons">
          {isModifyActive && (
            <button className="accent" onClick={e => handleSubmit(e)}>
              {TEXT.OK_BUTTON}
            </button>
          )}
          {(userDetails.userId === parseInt(userId) ||
            userDetails.role === 'admin') && (
            <button
              className={!isModifyActive ? 'accent' : undefined}
              onClick={e => {
                setModifyActive(!isModifyActive)
                e.preventDefault()
              }}
            >
              {isModifyActive ? TEXT.CANCEL_BUTTON : TEXT.MODIFY_BUTTON}
            </button>
          )}
        </div>
      </form>
      <h2 className="user-details__title-posts">
        {userDetails.userId === parseInt(userId) ? TEXT.MY_POSTS : TEXT.THEIRS_POSTS}
      </h2>
    </>
  )
}

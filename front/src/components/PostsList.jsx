import { useEffect, useState } from 'react'
import { doFetch } from '../utils/functions/doFetch'
import useAuth from '../utils/hooks/useAuth'
import { Post } from './Post'
import { Loader } from '../components/Loader'
import { DisplayError } from '../utils/Atoms/DisplayError'
import { POST_LIST as TEXT } from '../../public/assets/texts/texts'

export function PostList({ needReRender, userId }) {
  const [data, setData] = useState({})
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { userDetails } = useAuth()
  const [isCommentsneedReRender, setCommentNeedReRender] = useState(false)
  const commentNeedReRender = () => {
    setCommentNeedReRender(!isCommentsneedReRender)
  }

  useEffect(() => {
    const urlToFetch = userId
      ? `http://localhost:3000/api/users/${userId}/posts`
      : 'http://localhost:3000/api/posts/'
    const fetchData = async () => {
      const { data, isLoading, error } = await doFetch({
        method: 'GET',
        url: urlToFetch,
        token: userDetails.token,
      })
      setData(data)
      setLoading(isLoading)
      setError(error)
    }
    fetchData()
  }, [needReRender])

  if (error) return <DisplayError />

  if (isLoading) return <Loader />

  if (data.length === 0)
    return (
      <p style={{ textAlign: 'center', marginBlock: '30px' }}>{TEXT.NO_POST}</p>
    )

  return (
    <>
      {data
        .sort((a, z) => z.date - a.date)
        .map((post, index) => (
          <Post
            key={`post-${post.id}`}
            post={post}
            index={index}
            needReRender={needReRender}
            commentNeedReRender={commentNeedReRender}
          />
        ))}
    </>
  )
}

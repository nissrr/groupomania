import { useEffect, useState } from 'react'
import { DisplayError } from '../utils/Atoms/DisplayError'
import { doFetch } from '../utils/functions/doFetch'
import useAuth from '../utils/hooks/useAuth'
import { Comment } from './Comment'
import { CreateComment } from './CreateComment'

export function Comments({
  postId,
  commentNeedReRender,
  commentsNumber,
  setCommentsNumber,
}) {
  const [data, setData] = useState([])
  const [error, setError] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const { userDetails } = useAuth()
  useEffect(() => {
    const fetchData = async () => {
      const { data, isLoading, error } = await doFetch({
        method: 'GET',
        url: `http://localhost:3000/api/posts/${postId}/comment`,
        token: userDetails.token,
      })
      setData(data)
      setLoading(isLoading)
      setError(error)
    }
    fetchData()
  }, [commentNeedReRender])

  if (error) return <DisplayError />

  if (isLoading) return <Loader />

  return (
    <>
      {data
        .sort((a, z) => a.date - z.date)
        .map((comment, index) => (
          <Comment
            key={`post-${comment.postId}-comment-${comment.id}`}
            comment={comment}
            index={index}
            commentNeedReRender={commentNeedReRender}
            setCommentsNumber={setCommentsNumber}
            commentsNumber={commentsNumber}
          />
        ))}
      <CreateComment
        postId={postId}
        commentNeedReRender={commentNeedReRender}
        setCommentsNumber={setCommentsNumber}
        commentsNumber={commentsNumber}
      />
    </>
  )
}

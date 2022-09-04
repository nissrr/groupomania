import { useEffect, useRef, useState } from 'react'

export default function useComponentVisible() {
  const [isComponentVisible, setIsComponentVisible] = useState(false)
  const ref = useRef(null)

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setIsComponentVisible(!isComponentVisible)
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, !isComponentVisible)

    return () => {
      document.removeEventListener(
        'click',
        handleClickOutside,
        !isComponentVisible
      )
    }
  })
  return { ref, isComponentVisible, setIsComponentVisible }
}

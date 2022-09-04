import React from 'react'

export const DisplayError = React.forwardRef(({ message, setError }, ref) => {
  return (
    <div
      ref={ref}
      className="display-error user-details"
      style={{ gap: '10px', padding: '20px' }}
    >
      {!message && (
        <img src="\assets\undraw_server_down_s-4-lk.svg" width="100%" />
      )}
      <h3>Mince, il y a eu une erreur</h3>
      {message && (
        <>
          <p>{message}</p>
          <button
            className="accent"
            onClick={(e) => {
              e.preventDefault()
              setError(false)
            }}
          >
            Ok
          </button>
        </>
      )}
    </div>
  )
})

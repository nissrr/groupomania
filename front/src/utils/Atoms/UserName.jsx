export function UserName({ user, isShowingDepartement }) {
  return (
    <>
      {user.name && user.firstName ? (
        <span>
          {user.firstName} {user.name}
        </span>
      ) : (
        <span>{user.email}</span>
      )}
      {user.departement && isShowingDepartement && (
        <span>{user.departement}</span>
      )}
    </>
  )
}

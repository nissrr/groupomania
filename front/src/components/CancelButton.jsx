export function CancelButton({handleClick}){
    return (
        <svg
            viewBox="0 0 24 24"
            className="create-post__image--delete"
            onClick={handleClick}
            role="button"
          >
            <use href="#circle-cross" />
          </svg>
    )
}
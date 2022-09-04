import { LOADER as TEXT } from "../../public/assets/texts/texts";

export function Loader() {
  return (
    <div className="loader">
      <svg className="loader__logo">
        <use href="#groupomania-logo" />
      </svg>
      <p className="loader__text">{TEXT.LOADING}</p>
    </div>
  )
}

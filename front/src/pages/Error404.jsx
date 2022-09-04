import { useNavigate } from 'react-router-dom'

export function Error404() {
  const navigation = useNavigate()
  return (
    <div className="error404">
      <img src="\assets\undraw_page_not_found_re_e9o6.svg" alt="Erreur 404" />
      <h1>Oups, cette page n'existe pas...</h1>
      <button
        className="accent"
        onClick={(e) => {
          e.preventDefault()
          navigation('/')
        }}
      >
        Retourner à l'acceuil
      </button>
    </div>
  )
}

import { CancelButton } from "./CancelButton";
import { ALT_EXPLANATION as TEXT } from "../../public/assets/texts/texts";

export function AltTextExplanation({handleCancel}){
    return (
        <div className='altText-explanation post__confirmation-message'>
          <h4>{TEXT.TITLE}</h4>
          <p>{TEXT.DESCRIPTION}</p>
          <button className="accent" onClick={handleCancel}>{TEXT.BUTTON}</button>
          <CancelButton handleClick={handleCancel} />
        </div>
    )
}
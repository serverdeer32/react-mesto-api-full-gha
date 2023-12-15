import Success from "../../images/success.svg"
import Error from "../../images/error.svg"

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return(
    <div className={`popup  ${isOpen && 'popup_opened'}`} onClick={onClose}>
    <div className="popup__infotooltip" onClick={(evt => evt.stopPropagation())}>
    <button
        type="button"
        className="popup__button-close popup__button-close_photo"
        onClick={onClose}
      />
      <img alt={isSuccess ? 'Успех' : 'Ошибка'} className="popup__infotooltip-img" src={isSuccess ? Success : Error} />
      <span className="popup__info-error">{isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</span>


    </div>
  </div>
    )
}
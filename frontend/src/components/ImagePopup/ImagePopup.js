export default function ImagePopup({ card, onClose }) {
  return(
    <div className={`popup popup_photo ${card ? 'popup_opened' : ''}`}  onClick={onClose} >
    <div className="popup__photo" onClick={(evt => evt.stopPropagation())}>
    <button
        type="button"
        className="popup__button-close popup__button-close_photo"
        onClick={onClose}
      />

      <img className="popup__photo-source" alt={card?.name} src={card?.link} />
      <h3 className="popup__photo-title">{card?.name}</h3>


    </div>
  </div>
    )
}
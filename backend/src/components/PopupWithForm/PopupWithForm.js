export default function PopupWithForm({ name, title, buttonTitle, children, isOpen, onClose, onSubmit, isSend, isValid = true }) {
  return (
    <div className={`popup popup__${name} ${isOpen && 'popup_opened'}`} onClick={onClose}>
      <div className="popup__edit-form" onClick={(evt => evt.stopPropagation())}>
        <button
          className="popup__button-close popup__button-close-profile"
          title="Закрыть окно"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        />

        <h2 className="popup__title">{title}</h2>
        <form
          noValidate
          className="popup__form popup__form-edit"
          id={`${name}-form`}
          name={`${name}-form`}
          method="POST"
          onSubmit={onSubmit}
        >
          {children}
          <button type="submit" className={`popup__button ${isSend ? 'popup__button_loading' : ''} ${isValid ? '' : 'popup__button_disabled'}`} disabled={!isValid}>
            {isSend ? '' : buttonTitle || 'Сохранить'}
          </button>
        </form>

      </div>
    </div>
  )
}
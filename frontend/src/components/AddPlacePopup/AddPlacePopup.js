import FormValidation from "../../utils/FormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isSend }) {

  const { values, errors, isValid, isInputValid, handleChange, reset } = FormValidation();

  function resetAfterClose() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onAddPlace({ name: values.name, link: values.link }, reset)
  }

  return (
    <PopupWithForm
      name='add_card'
      title='Новое место'
      buttonTitle='Создать'
      isOpen={isOpen}
      onClose={resetAfterClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      isSend={isSend}
    >
      <label className="popup__input-label">
        <input
          required
          minLength={2}
          maxLength={30}
          className={`popup__input ${isInputValid.name === undefined || isInputValid.name ? '' : 'popup__input_type_error'}`}
          id="name"
          name="name"
          placeholder="Название"
          type="text"
          value={values.name ? values.name : ''}
          onChange={handleChange}
          disabled={isSend}
        />
        <span id="card-name-error" className="popup__error popup__error_visible">{errors.name}</span>
      </label>
      <label className="popup__input-label">
        <input
          required
          type="url"
          className={`popup__input ${isInputValid.link === undefined || isInputValid.link ? '' : 'popup__input_type_error'}`}
          id="link"
          name="link"
          placeholder="Ссылка на картинку"
          value={values.link ? values.link : ''}
          onChange={handleChange}
          disabled={isSend}
        />
        <span id="card-link-error" className="popup__error popup__error_visible">{errors.link}</span>
      </label>
    </PopupWithForm>
  )
}
import { useRef } from "react";
import FormValidation from "../../utils/FormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSend }) {

  const input = useRef();

  const { values, errors, isValid, isInputValid, handleChange, reset } = FormValidation();

  function resetAfterClose() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: input.current.value }, reset);
  }

  return (
    <PopupWithForm
      name='edit_avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={resetAfterClose}
      onSubmit={handleSubmit}
      isSend={isSend}
      isValid={isValid}
    >
      <label className="popup__input-label">
        <input
          ref={input}
          required
          type="url"
          className={`popup__input ${isInputValid.avatar === undefined || isInputValid.avatar ? '' : 'popup__input_type_error'}`}
          id="avatar"
          name="avatar"
          placeholder="Ссылка на аватар"
          value={values.avatar ? values.avatar : ''}
          disabled={isSend}
          onChange={handleChange}
        />
        <span id="avatar-error" className="popup__error">{errors.avatar}</span>
      </label>
    </PopupWithForm>
  )
}
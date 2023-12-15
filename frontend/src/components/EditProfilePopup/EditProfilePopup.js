import { useContext, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm"
import FormValidation from "../../utils/FormValidation"
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSend }) {
  const { values, errors, isValid, isInputValid, handleChange, reset, setValue } = FormValidation();

  const currentUser = useContext(CurrentUserContext)

  useEffect(() => {
    setValue('username', currentUser.name);
    setValue('description', currentUser.about);
  }, [currentUser, setValue]);

  function resetAfterClose() {
    onClose();
    reset({ username: currentUser.name, description: currentUser.about });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ username: values.username, description: values.description }, reset);
  }

  return (
    <PopupWithForm
      name='profile'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={resetAfterClose}
      isValid={isValid}
      isSend={isSend}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-label">
        <input
          required
          minLength={2}
          maxLength={40}
          className={`popup__input ${isInputValid.username === undefined || isInputValid.username ? '' : 'popup__input_type_error'}`}
          id="username"
          name="username"
          placeholder="Имя"
          type="text"
          value={values.username ? values.username : ''}
          onChange={handleChange}
          disabled={isSend}
        />
        <span id="username-error" className="popup__error popup__error_visible">{errors.username}</span>
      </label>
      <label className="popup__input-label">
        <input
          required
          minLength={2}
          maxLength={200}
          className={`popup__input ${isInputValid.description === undefined || isInputValid.description ? '' : 'popup__input_type_error'}`}
          name="description"
          id="description"
          placeholder="О себе"
          type="text"
          value={values.description ? values.description : ''}
          onChange={handleChange}
          disabled={isSend}
        />
        <span id="description-error" className="popup__error popup__error_visible">{errors.description}</span>
      </label>
    </PopupWithForm>
  )
}
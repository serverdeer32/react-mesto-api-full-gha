import { Link } from "react-router-dom";
import { useState } from "react";


export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleInputEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleInputPasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password)
  }

  return (
    <div className='auth'>
      <h2 className="auth__title">Регистрация</h2>
      <form
        noValidate
        className="popup__form popup__form-edit"
        method="POST"
        onSubmit={handleSubmit}
      >
        <label className="popup__input-label">
          <input
            required
            minLength={2}
            maxLength={40}
            className="auth__input"
            id="email"
            name="email"
            placeholder="email"
            type="E-Mail"
            value={email}
            onChange={handleInputEmailChange}
          />
        </label>
        <label className="popup__input-label">
          <input
            required
            minLength={2}
            maxLength={200}
            autoComplete="on"
            className="auth__input"
            name="password"
            id="password"
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={handleInputPasswordChange}
          />
        </label>
        <button type="submit" className="auth__button">Зарегистрироваться</button>
        <div className="auth__login"><span className="auth__span">Уже зарегистрированы?</span> <Link className="auth__link" to="/sign-in">Войти</Link></div>
      </form>
    </div>
  )
}
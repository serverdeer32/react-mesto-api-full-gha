import { useState } from "react";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleInputEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleInputPasswordChange(e) {
    setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return(
    <div className='auth'>
    <h2 className="auth__title">Вход</h2>
    <form
      noValidate
      onSubmit={handleSubmit}
      className="popup__form popup__form-edit"
      method="POST"
    >
      <label className="popup__input-label">
        <input
          required
          minLength={2}
          maxLength={40}
          className="auth__input"
          id="email"
          name="email"
          placeholder="E-Mail"
          type="text"
          value={email}
          onChange={handleInputEmailChange}
        />
      </label>

      <label className="popup__input-label">
        <input
          required
          minLength={6}
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

      <button type="submit" className="auth__button" id="login">Авторизоваться</button>
    </form>
    </div>
  )
}
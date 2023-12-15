import logo from '../../images/logo.svg'
import { Route, Link, Routes } from "react-router-dom";

export default function Header({ onSignOut, userData }) {

  return (
    <header className="header">
      <a href="/"><img
        src={logo}
        className="header__logo"
        alt="Логотип проекта"
      /></a>

      <div>
        <span className="header__mail">{userData}</span>
        <Routes>
          <Route path="/sign-in" element={<Link className="header__auth-button" to="/sign-up">Регистрация</Link>} />
          <Route path="/sign-up" element={<Link className="header__auth-button" to="/sign-in">Войти</Link>} />
          <Route path="/" element={<Link onClick={onSignOut} className="header__logout-button" to="/sign-in">Выйти</Link>} />
        </Routes>
      </div>

    </header>
  )
}
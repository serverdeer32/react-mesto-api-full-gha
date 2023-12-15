import { useContext } from "react"
import Card from "../Card/Card";
import EditAvatar from "../../images/ava-edit.png"
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Loader from "../Loader/Loader";

export default function Main({ onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardDelete, cards, isLoadingCards }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img
            src={currentUser.avatar}
            alt="Аватар пользователя"
            className="profile__avatar-img"
          />
          <div className="profile__avatar-overlay">
            <img
              className="profile__avatar-edit"
              src={EditAvatar}
              alt="Редактировать аватар"
              onClick={onEditAvatar}
            />
          </div>
        </div>
        <div className="profile__info">
          <div className="profile__user">
            <h1 className="profile__name">{currentUser.name ? currentUser.name : 'Загрузка...'}</h1>
            <button
              className="profile__button-edit"
              type="button"
              title="Редактировать профиль"
              aria-label="Редактировать профиль"
              onClick={onEditProfile}
            />
          </div>
          <p className="profile__description">{currentUser.about ? currentUser.about : 'Загрузка...'}</p>
        </div>
        <button
          className="profile__button-add"
          type="button"
          title="Добавить"
          aria-label="Добавить"
          onClick={onAddPlace}
        />
      </section>

      <section className="gallery">
        <ul className="gallery__list">
          {isLoadingCards ? <Loader /> : cards.map(item => {
            return (
              <li className="gallery__item" key={item._id}>
                <Card card={item} onCardClick={onCardClick} onCardDelete={onCardDelete} />
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
import { useContext, useEffect, useState } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import api from "../../utils/api";

export default function Card({ card, onCardClick, onCardDelete }) {

  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(card.likes.length);

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;

  useEffect(() => {
    setIsLiked(card.likes.some(el => currentUser._id === el._id))
  }, [card.likes, currentUser._id]);

  function handleCardLike() {
    if (isLiked) {
      api.removeLike(card._id, localStorage.jwt)
        .then(res => {
          setIsLiked(false)
          setCount(res.likes.length)
        })
        .catch((err) => console.error(`Не удалось снять лайк: ${err}`));
    } else {
      api.addLike(card._id, localStorage.jwt)
        .then(res => {
          setIsLiked(true)
          setCount(res.likes.length)
        })
        .catch((err) => console.error(`Не удалось поставить лайк: ${err}`));
    }
  }

  return (
    <>
      <img className="gallery__photo" src={card.link} alt={card.name} onClick={() => onCardClick(card)} />
      {isOwn && <button className="gallery__button-delete" type="button" title="Удалить!" aria-label="Удалить!" onClick={() => onCardDelete(card._id)} />}

      <div className="gallery__info">
        <h2 className="gallery__title">{card.name}</h2>
        <div className="gallery__like">
          <button
            className={`gallery__button-like ${isLiked ? 'gallery__button-like_active' : ''}`}
            type="button"
            title="Лайк!"
            aria-label="Лайк!"
            onClick={handleCardLike}
          />
          <span className="gallery__button-like-counter">{count}</span>
        </div>
      </div>
    </>
  )
}
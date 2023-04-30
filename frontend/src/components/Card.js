import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (`card__trash-button ${!isOwn && 'card__trash-button_hidden'}`);
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((id) => id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (`card__like-button ${isLiked && 'card__like-button_active'}`);

  return (
    <article className="card">
      <button aria-label="удалить карточку" type="button" onClick={() => onCardDelete(card)} className={cardDeleteButtonClassName}></button>
      <div onClick={() => onCardClick(card)} style={{ backgroundImage: `url(${card.link})` }} className="card__mask-group" ></div>
      <div className="card__text-button">
        <h2 className="card__text">{card.name}</h2>
        <div className="card__container-like-counter">
          <button aria-label="поставить лайк" type="button" onClick={() => onCardLike(card)} className={cardLikeButtonClassName}></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}

export default Card;



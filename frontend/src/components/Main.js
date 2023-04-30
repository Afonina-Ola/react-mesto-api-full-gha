import React from "react";
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__profile-info">
          <div onClick={onEditAvatar} className="profile__container-avatar">
            <div style={{ backgroundImage: `url(${currentUser.avatar})` }} className="profile__avatar" ></div>
          </div>
          <div className="profile__profile-info-text">
            <div className="profile__profile-info-name">
              <h1 className="profile__author">{currentUser.name}</h1>
              <button aria-label="указать имя и о себе" type="button" onClick={onEditProfile} className="profile__stilus"></button>
            </div>
            <p className="profile__about-the-author">{currentUser.about}</p>
          </div>
        </div>
        <button aria-label="добавить новую карточку" type="button" onClick={onAddPlace} className="profile__add-button"></button>
      </section>
      <section className="cards">
        {cards.map((card) => (
          <Card onCardDelete={onCardDelete} onCardLike={onCardLike} onCardClick={onCardClick} key={card._id} card={card} />
        ))}
      </section>
    </main>
  );
}

export default Main;



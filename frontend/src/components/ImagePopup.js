function ImagePopup({ card, onClose, isOpen }) {

  return (
    <div className={isOpen ? 'popup popup_dark popup_opened' : "popup popup_dark"} id="cardOpened">
      <div className="popup__container-card-opened">
        <figure className="popup__image-text-card">
          <img src={card && card.link} className="popup__image" alt={card && card.name} />
          <figcaption className="popup__image-text">{card && card.name}</figcaption>
        </figure>
        <button onClick={onClose} aria-label="закрыть" type="button" className="popup__button-close" id="imageClose"></button>
      </div>
    </div>
  );
}

export default ImagePopup;


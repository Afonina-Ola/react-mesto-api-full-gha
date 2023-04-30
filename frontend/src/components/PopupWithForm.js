function PopupWithForm({ title, name, children, isOpen, onClose, buttonText, onSubmit }) {
  return (
    <div className={isOpen ? 'popup popup_opened' : "popup"} id={`info${name}`}>
      <div className="popup__container">
        <form name={`form${name}`} className="popup__form" id={`${name}form`} onSubmit={onSubmit}>
          <h3 className="popup__heading-form">{title}</h3>
          {children}
          <button type="submit" className="popup__submit-button">{buttonText}</button>
        </form>
        <button onClick={onClose} aria-label="закрыть" type="button" className="popup__button-close" />
      </div>
    </div>
  );
}

export default PopupWithForm;


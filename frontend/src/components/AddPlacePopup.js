import PopupWithForm from './PopupWithForm';
import React from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleName(e) {
    setName(e.target.value);
  }

  function handleLink(e) {
    setLink(e.target.value);
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  return (
    <PopupWithForm onClose={onClose} isOpen={isOpen} title='Новое место' name='Card' buttonText='Сохранить' onSubmit={handleSubmit}>
      <fieldset className="popup__form-input-container">
        <input value={name} onChange={handleName} type="text" className="popup__item" id="mesto" name="mesto-name" placeholder="Название" required
          minLength="2" maxLength="30" />
        <span className="mesto-input-error popup__item-error"></span>
        <input value={link} onChange={handleLink} type="url" className="popup__item" id="mestoHref" name="href-addres" placeholder="Ссылка на картинку"
          required />
        <span className="mestoHref-input-error popup__item-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;


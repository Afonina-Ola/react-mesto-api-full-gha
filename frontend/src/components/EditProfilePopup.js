import PopupWithForm from './PopupWithForm';
import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleName(e) {
    setName(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm onClose={onClose} isOpen={isOpen} title='Редактировать профиль' name='User' buttonText='Сохранить' onSubmit={handleSubmit}>
      <fieldset className="popup__form-input-container">
        <input type="text" className="popup__item" id="username" name="user-name" placeholder="Имя" required minLength="2"
          maxLength="40" value={name} onChange={handleName} />
        <span className="username-input-error popup__item-error"></span>
        <input type="text" className="popup__item" id="userjob" name="about-the-user" placeholder="О себе" required
          minLength="2" maxLength="200" value={description} onChange={handleDescription} />
        <span className="userjob-input-error popup__item-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;


import PopupWithForm from './PopupWithForm';
import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  const [avatar, setAvatar] = React.useState('');

  React.useEffect(() => {
    setAvatar(currentUser.avatar);
  }, [currentUser]);
  const avatarRef = React.useRef();
  function handleChange() {
    setAvatar(avatarRef.current.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatar,
    });
  }

  return (
    <PopupWithForm onClose={onClose} isOpen={isOpen} title='Обновить аватар' name='Avatar' buttonText='Сохранить' onSubmit={handleSubmit}>
      <fieldset className="popup__form-input-container">
        <input ref={avatarRef} onChange={handleChange} type="url" className="popup__item" id="avatarHref" name="href-avatar" placeholder="ссылка на аватар"
          required />
        <span className="avatarHref-input-error popup__item-error"></span>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;


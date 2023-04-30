import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import React, { useCallback, useEffect, useState } from 'react';
import userApi from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import { login, checkToken } from '../utils/mestoAuth'
import { useHistory } from 'react-router-dom';
import { register } from '../utils/mestoAuth'
import { infoTexts } from '../utils/constants';

function App() {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [infoTooltipState, setInfoTooltipState] = useState('hidden');
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditPlacePopupOpen, setIsEditPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState('');
  const [cards, setCards] = useState([])

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  const handleAddPlaceClick = () => {
    setIsEditPlacePopupOpen(!isEditPlacePopupOpen);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsEditPlacePopupOpen(false);
    setSelectedCard(null);
  }

  const handleError = (error) => console.log(`Ошибка: ${error}`);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loggedIn && userApi.getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch(handleError)
    }
  }, [loggedIn])

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loggedIn && userApi.getCards()
        .then((res) => {
          setCards(res);
        })
        .catch(handleError)
    }
  }, [loggedIn])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((id) => id === currentUser._id);
    if (isLiked) {
      userApi.removeLike(card._id)
        .then((res) => {
          setCards((state) => state.map((c) => c._id === card._id ? res : c));
        })
        .catch(handleError);
    } else {
      userApi.addLike(card._id)
        .then((res) => {
          setCards((state) => state.map((c) => c._id === card._id ? res : c));
        })
        .catch(handleError);
    }
  }

  function handleCardDelete(card) {
    userApi.deleteCard(card._id).then(() => {
      setCards(state => state.filter((c) => c._id !== card._id));
    })
      .catch(handleError);
  }

  function handleUpdateUser({ name, about }) {
    userApi.editUser(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(handleError)
  }

  function handleAddPlaceSubmit({ name, link }) {
    userApi.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(handleError)
  }

  function handleUpdateAvatar({ avatar }) {
    userApi.editAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(handleError)
  }

  const handleLogin = async (e, password, email) => {
    e.preventDefault();
    try {
      if (!password || !email) { return alert('Нужно заполнить обязательные поля') };
      const res = await login({ password, email });
      if (res) {
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        setUserEmail(email);
        history.push('/');
      }
    } catch (err) {
      setInfoTooltipState('error');
      console.error(err)
    }
  }

  const handleRegister = async (e, password, email) => {
    e.preventDefault();
    try {
      if (!password || !email) { return alert('Нужно заполнить обязательные поля') };
      const res = await register({ password, email });
      if (res._id) setInfoTooltipState('success');
    } catch (err) {
      setInfoTooltipState('error');
      console.error(err)
    }
  }

  const signout = useCallback(() => {
    setLoggedIn(false);
    localStorage.removeItem('token');
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      checkToken(token).then((data) => {
        setLoggedIn(true);
        setUserEmail(data.email);
        history.push('/');
      }).catch((err) => console.log(err))
        .finally(() => {
          setLoading(false)
        })
    } else {
      setLoading(false)
    }
  },
    [history])

  if (loading) {
    return '...Loading';
  }

  const handleInfoTooltipClick = () => {
    if (infoTooltipState === 'success') {
      history.push('/sign-in');
    }
    setInfoTooltipState('hidden');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className='page'>
          <Header
            email={userEmail} signout={signout}
          />
          <Switch>
            <Route exact path="/sign-in">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route exact path="/sign-up">
              <Register handleRegister={handleRegister} />
            </Route>
            <ProtectedRoute exact path="/"
              loggedIn={loggedIn}
              component={<>
                <Main cards={cards} onCardClick={handleCardClick} onEditProfile={handleEditProfileClick} onEditAvatar={handleEditAvatarClick} onAddPlace={handleAddPlaceClick} onCardDelete={handleCardDelete} onCardLike={handleCardLike} />
                <Footer />
              </>}
            />
          </Switch>
          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
          <AddPlacePopup isOpen={isEditPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
          <PopupWithForm title='Вы уверены?' name='CardDelete' buttonText='Да' />
          <ImagePopup onClose={closeAllPopups} card={selectedCard} isOpen={selectedCard} />
          {infoTooltipState !== 'hidden' &&
            <InfoTooltip mode={infoTooltipState} onInfoTooltipClick={handleInfoTooltipClick} textSuccess={infoTexts.textSuccess} textError={infoTexts.textError} />
          }
        </div >
      </div>
    </CurrentUserContext.Provider >
  );
}

export default App;

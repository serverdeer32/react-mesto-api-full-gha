import { useEffect, useState } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import api from '../../utils/api';
import { Route, Routes, useNavigate } from 'react-router-dom'

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';

import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup';
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup';
import AddPlacePopup from '../AddPlacePopup/AddPlacePopup';

import Login from '../Login/Login';
import Register from '../Register/Register'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import * as auth from '../../utils/auth'
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSend, setIsSend] = useState(false);
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([]);
  const [isLoadingCards, setIsLoadingCards] = useState(true);
  const [deleteCardId, setDeleteCardId] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate()

  const [isInfoToolTip, setInfoToolTip] = useState(false)

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setDeletePopupOpen(false);
    setSelectedCard(null);
    setInfoToolTip(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDelete(cardId) {
    setDeleteCardId(cardId);
    setDeletePopupOpen(true);
  }

  function handleInfoToolTipClick() {
    setInfoToolTip(true);
  }

  useEffect(() => {
    if (loggedIn) {
      setIsLoadingCards(true);
      Promise.all([api.getInfo(localStorage.jwt), api.getInitialCards(localStorage.jwt)])
        .then(([userData, cardData]) => {
          setCurrentUser(userData)
          setCards(cardData)
          setIsLoadingCards(false)
        })
        .catch((err) => {
          console.error(`Не удалось загрузить данные: ${err}`);
        })
    }
  }, [loggedIn])

  useEffect(() => {
    if (localStorage.jwt) {
      auth.getContent(localStorage.jwt)
        .then(res => {
          setUserData(res.email)
          setLoggedIn(true)
          navigate('/')
        })
        .catch(err => console.log(`Ошибка авторизации при повторном входе ${err}`))
    } else {
      setLoggedIn(false)
    }
  }, [])

  function handleDeleteClick(evt) {
    evt.preventDefault();
    setIsSend(true);
    api.deleteCard(deleteCardId, localStorage.jwt)
      .then(() => {
        setCards(cards.filter(item => {
          return item._id !== deleteCardId
        }))
        closeAllPopups();
        setIsSend(false)
      })
      .catch((err) => console.error(`Не удалось удалить карточку: ${err}`))
      .finally(() => setIsSend(false))
  }

  function handleUpdateUser(dataUser, reset) {
    setIsSend(true);
    api.setUserInfo(dataUser, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((err) => console.error(`Не удалось обновить данные профиля: ${err}`))
      .finally(() => setIsSend(false))
  }

  function handleUpdateAvatar(dataUser, reset) {
    setIsSend(true);
    api.setAvatar(dataUser, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
        setIsSend(false)
      })
      .catch((err) => console.error(`Не удалось обновить аватар: ${err}`))
      .finally(() => setIsSend(false))
  }

  function handleAddPlaceSubmit(dataCard, reset) {
    setIsSend(false);
    api.addCard(dataCard, localStorage.jwt)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
        reset()
        setIsSend(false)
      })
      .catch((err) => console.error(`Не удалось добавить карточку: ${err}`))
      .finally(() => setIsSend(false))
  }


  function handleLogin(email, password) {
    setIsSend(true)
    auth.authorize(email, password)
      .then(res => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        setUserData(email)
        navigate('/')
      })
      .catch((err) => {
        setSuccess(false)
        handleInfoToolTipClick();
        console.error(`Ошибка авторизации ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  function handleRegister(email, password) {
    setIsSend(true)
    auth.register(email, password)
      .then(() => {
        setSuccess(true)
        navigate('/sign-in')
        handleInfoToolTipClick();
      })
      .catch((err) => {
        setSuccess(false)
        handleInfoToolTipClick();
        console.error(`Ошибка регистрации ${err}`)
      })
      .finally(() => setIsSend(false))
  }

  function handleSignOut() {
    localStorage.removeItem('jwt')
    setLoggedIn(false)
    setUserData('')
  }

  return (
    <div className="page__content">

      <Header onSignOut={handleSignOut} userData={userData} />

      <CurrentUserContext.Provider value={currentUser}>

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                element={<Main
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  isLoadingCards={isLoadingCards} />}
                loggedIn={loggedIn}
              />}

          />

          <Route path='/sign-in' element={<Login onLogin={handleLogin} />} />
          <Route path='/sign-up' element={<Register onRegister={handleRegister} />} />
        </Routes>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isSend={isSend}
          buttonTitle='Сохранить'
        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isSend={isSend}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isSend={isSend}
        />

        <PopupWithForm
          name='delete_card'
          title='Вы уверены?'
          buttonTitle='Да'
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteClick}
          isSend={isSend}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoToolTip}
          onClose={closeAllPopups}
          isSuccess={success}
        />


      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;

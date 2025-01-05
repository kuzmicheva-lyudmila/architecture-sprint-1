import React from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import PopupWithForm from "./PopupWithForm";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { CurrentUserContext } from "react-redux";

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  // В корневом компоненте App создана стейт-переменная currentUser. Она используется в качестве значения для провайдера контекста.
  const [currentUser, setCurrentUser] = React.useState({});

  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getUserInfo()
      .then(([userData]) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleUpdateUser(userUpdate) {
    api
      .setUserInfo(userUpdate);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleUpdateUser(userUpdate) {
      api
        .setUserInfo(userUpdate)
        .then((newUserData) => {
          setCurrentUser(newUserData);
          closeAllPopups();
        })
        .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarUpdate) {
      api
        .setUserAvatar(avatarUpdate)
        .then((newUserData) => {
          setCurrentUser(newUserData);
          closeAllPopups();
        })
        .catch((err) => console.log(err));
  }

  return (
    // В Redux Store хранится CurrentUserContext: currentUser
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page__content">
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onUpdateUser={handleUpdateUser}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        />
    </CurrentUserContext.Provider>
  );
}

export default App;

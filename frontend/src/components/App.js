import React from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ProtectedRoute from "./ProtectedRoute";
import Auth from "auth";
import Profile from "profile";
import Card from "card";

function App() {

  const history = useHistory();

  function onRegister({ email, password }) {
    Auth.onRegister(email, password)
    .then(() => {
      history.push("/signin");
    })
  }

  function onLogin({ email, password }) {
    Auth.onLogin(email, password)
      .then(() => {
        history.push("/");
      });
  }

  function onSignOut() {
    Auth.onSignOut()
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    history.push("/signin");
  }

  function getEmail() {
    return Auth.getEmail();
  }

  function isLoggedIn() {
    return Auth.isLoggedIn();
  }

  function getCards() {
    return Card.getCards();
  }

  function handleEditProfileClick() {
    Profile.handleEditProfileClick();
  }

  function handleAddPlaceClick() {
    Card.handleAddPlaceClick();
  }

  function handleEditAvatarClick() {
    Profile.handleEditAvatarClick();
  }

  function handleCardClick({card}) {
    Card.handleCardClick(card);
  }

  function handleCardDelete({card}) {
    Card.handleCardDelete(card);
  }

  return (
      <div className="page__content">
        <Header email={getEmail} onSignOut={onSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            cards={getCards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={isLoggedIn}
          />
          <Route path="/signup">
            <Register onRegister={onRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={onLogin} />
          </Route>
        </Switch>
        <Footer />
      </div>
  );
}

export default App;

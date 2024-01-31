import { useState, useContext } from "react";
import { NavLink } from 'react-router-dom';

import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header";
import Card from "./Card.jsx";

function Main(props) {
  const {
    onLogOut,
    cards,
    onCardClick,
    onCardLike,
    onCardDelete,
    onEditAvatar,
    onEditProfile,
    onAddPlace,
  } = props;
  const currentUser = useContext(CurrentUserContext);
  const [isOpen, setIsOpen] = useState(false);

  function handleToggleClick() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <Header isOpen={isOpen} onLogOut={onLogOut}>
        <nav className="header__auth">
          <p className="header__email">{localStorage.getItem('email')}</p>
          <NavLink to="/signin" className="header__logout header__logout_gray" onClick={onLogOut}>Выйти</NavLink>
        </nav>
        <button
          className={`header__burger  ${isOpen ? "header__burger_open" : ""}`}
          aria-label="Открыть бургер"
          type="button"
          onClick={handleToggleClick}
        >
          <span className="header__burger-layer"></span>
          <span className="header__burger-layer"></span>
          <span className="header__burger-layer"></span>
        </button>
      </Header>

      <main className="content">
        <section className="profile">
          <div
            className="profile__overlay"
            aria-label="Редактировать"
            onClick={onEditAvatar}
          >
            <img
              className="profile__avatar"
              src={currentUser?.avatar}
              alt="аватар"
            />
          </div>
          <div className="profile__info">
            <div className="profile__name-wrapp">
              <h1 className="profile__name">{currentUser?.name}</h1>
              <button
                className="profile__edit-button"
                aria-label="Редактировать"
                type="button"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__description">{currentUser?.about}</p>
          </div>
          <button
            className="profile__add-button"
            aria-label="Новое место"
            type="button"
            onClick={onAddPlace}
          />
        </section>

        <section className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </section>
      </main>
    </>
  );
}

export default Main;

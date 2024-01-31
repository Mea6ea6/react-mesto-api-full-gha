import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import Header from "./Header";

function Register(props) {

  const {onRegister} = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => { 
    setEmail("");
    setPassword("");
  }, []);

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
    setEmail("");
    setPassword("");
  }

  return (
    <>
      <Header>
        <NavLink to="/signin" className="header__logout">Войти</NavLink>
      </Header>
      <div className="sign">
        <h2 className="sign__title">Регистрация</h2>
        <form className="sign__form" onSubmit={handleSubmit}>
          <div className="sign__fields">
            <input
              className="sign__input"
              id="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              minLength="2"
              maxLength="80"
              type="email"
              required
              value={email || ""}
              onChange={handleEmailChange}
            />
            <input
              className="sign__input"
              id="password"
              name="password"
              placeholder="Пароль"
              autoComplete="off"
              minLength="2"
              maxLength="80"
              type="password"
              required
              value={password || ""}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            className="sign__submit-button"
            aria-label="Register"
            type="submit"
          >
            Зарегистрироваться
          </button>
        </form>
        <p className="sign__additionally">
          Уже зарегистрированы?
          <NavLink to="/signin" className="sign__link">Войти</NavLink>
        </p>
      </div>
    </>
  );
}

export default Register;

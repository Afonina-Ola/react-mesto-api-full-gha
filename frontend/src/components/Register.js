
import React, { useState } from "react";
import { NavLink } from 'react-router-dom';

function Register({ handleRegister }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const handleInputChange = (e, setValue) => {
    setValue(e.target.value)
  }

  return (
    <div className="sign">
      <form onSubmit={(e) => handleRegister(e, password, email)} className="sign__form" >
        <h3 className="sign__heading-form">Регистрация</h3>
        <fieldset className="sign__form-input-container">
          <input required onChange={(e) => { handleInputChange(e, setEmail) }} type="email" className="sign__input-form" name="email" placeholder="Email" />
          <input required onChange={(e) => { handleInputChange(e, setPassword) }} type="password" className="sign__input-form" name="password" placeholder="Пароль" />
        </fieldset>
        <button type="submit" className="sign__button">Зарегистрироваться</button>
      </form>
      <NavLink to="/sign-in" className="sign__link">Уже зарегистрированы? Войти</NavLink>
    </div>
  );
}

export default Register;


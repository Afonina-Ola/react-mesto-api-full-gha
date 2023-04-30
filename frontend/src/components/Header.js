import headerLogo from '../images/header-logo.svg';
import { Link, Route } from 'react-router-dom';

function Header({ email, signout }) {
  function handleSignout() { signout() }
  return (
    <header className="header">
      <img src={headerLogo} className="header__logo" alt='логотип' />
      <Route exact path="/">
        <div className="header__wrapper">
          <p className="header__mail">{email}</p>
          <button className="header__logout" onClick={handleSignout}>Выйти</button>
        </div>
      </Route>
      <Route path="/sign-up">
        <Link className="header__link" to="sign-in">Войти</Link>
      </Route>
      <Route path="/sign-in">
        <Link className="header__link" to="sign-up">Регистрация</Link>
      </Route>
    </header>
  )
}

export default Header;
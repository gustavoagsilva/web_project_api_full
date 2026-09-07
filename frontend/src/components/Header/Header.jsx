import logo from "../../images/logo.svg";

function Header({ onSignOut, isLoggedIn, userEmail }) {
  return (
    <header className="header page__section">
      <img src={logo} alt="Around the U.S logo" className="logo header__logo" />
      {isLoggedIn && (
        <div>
          <span className="header__email">{userEmail}</span>
          <button className="header__link-logout" onClick={onSignOut}>
            Sair
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;

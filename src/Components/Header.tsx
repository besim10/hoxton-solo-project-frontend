import logo from "../images/logo.png";

type Props = {
  setModal: (value: string) => void;
};
function Header({ setModal }: Props) {
  return (
    <header>
      <nav className="navigation-header">
        <ul className="logo-section">
          <li className="logo-section__item">
            <img src={logo} />
            <h1>Medica+</h1>
          </li>
        </ul>
        <ul className="login-section">
          <li className="login-section__button">
            <button
              onClick={() => {
                setModal("sign-up");
              }}
            >
              Sign Up
            </button>
          </li>
          <li className="login-section__button">
            <button onClick={() => setModal("log-in")}>Log in</button>
          </li>
          <li className="login-section__info">
            <h3>Hot Line +38344255255</h3>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;

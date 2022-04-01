import { Admin } from "../App";
import logo from "../images/logo.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  setModal: (value: string) => void;
  admin: Admin | null;
  setAdmin: (value: Admin | null) => void;
};
function Header({ setModal, admin, setAdmin }: Props) {
  const [showUserDropDownList, setShowUserDropDownList] = useState(false);
  const navigate = useNavigate();
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
          {admin === null ? (
            <>
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
            </>
          ) : (
            <li className="login-section__button">
              <button
                className="admin_button"
                onClick={() => {
                  setShowUserDropDownList(!showUserDropDownList);
                }}
              >
                <img src={admin.avatar} alt="" />
                <span>
                  {showUserDropDownList ? (
                    <KeyboardArrowUpIcon sx={{ fontSize: 30 }} />
                  ) : (
                    <KeyboardArrowDownIcon sx={{ fontSize: 30 }} />
                  )}
                </span>
                {showUserDropDownList ? (
                  <div className="small-modal">
                    <ul>
                      <li
                        onClick={() => {
                          setAdmin(null);
                          localStorage.clear();
                          navigate("/intro");
                        }}
                      >
                        <LogoutIcon /> Logout
                      </li>
                    </ul>
                  </div>
                ) : null}
              </button>
            </li>
          )}

          <li className="login-section__info">
            <h3>Hot Line +38344255255</h3>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;

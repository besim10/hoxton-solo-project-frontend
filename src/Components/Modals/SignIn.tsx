import { Props } from "./Modals";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import xIcon from "./../../icons/x-icon.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type Data = {
  email: string;
  password: string;
};
function SignIn({ modal, setModal, setAdmin }: Props) {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function LogIn(data: Data) {
    fetch(`http://localhost:8000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.admin) {
          setAdmin(data.admin);
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
          setModal("success");
        } else {
          setError(data.error);
        }
      });
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const data = { email, password };
    LogIn(data);
  };
  return (
    <div
      onClick={() => {
        setModal("");
      }}
      className="modal-wrapper"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="modal-container"
      >
        <header className="modal-header">
          <img onClick={() => setModal("")} src={xIcon} />
          <AccountCircleIcon
            className="user-icon"
            color="primary"
            sx={{ fontSize: 80 }}
          />
          <h2>ACCOUNT LOGIN</h2>
        </header>
        <main className="modal-body">
          <form onSubmit={handleSubmit}>
            <label>
              EMAIL:
              <input type="email" name="email" required />
            </label>
            <label>
              PASSWORD:
              <input type="password" name="password" minLength={5} required />
            </label>
            {error !== "" ? (
              <span className="password-error">{error}</span>
            ) : null}
            <button type="submit">LOG IN</button>
          </form>
        </main>
      </div>
    </div>
  );
}
export default SignIn;

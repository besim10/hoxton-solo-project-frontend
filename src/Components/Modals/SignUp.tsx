import { Props } from "./Modals";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import xIcon from "./../../icons/x-icon.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
type Data = {
  fullName: string;
  email: string;
  password: string;
  avatar: string;
};
function SignUp({ modal, setModal, setAdmin }: Props) {
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const register = (data: Data) => {
    fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          setError("Email is already taken!");
        } else {
          setAdmin(data.admin);
          setModal("success-new-admin");
          localStorage.setItem("token", data.token);
          navigate("/dashboard");
        }
      });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const avatar = e.target.avatar.value;
    const data = {
      fullName,
      email,
      password,
      avatar,
    };

    register(data);
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
          <AdminPanelSettingsIcon
            className="user-icon"
            color="primary"
            sx={{ fontSize: 80 }}
          />
          <h2>NEW ADMIN</h2>
        </header>
        <main className="modal-body">
          <form onSubmit={handleSubmit}>
            <label>
              FULL NAME:
              <input type="text" name="fullName" required />
            </label>
            <label>
              EMAIL:
              <input type="email" name="email" required />
            </label>
            <label>
              PASSWORD:
              <input type="password" name="password" required />
            </label>
            <label>
              AVATAR:
              <input type="text" name="avatar" required />
            </label>
            {error !== "" ? <span className="email-error">{error}</span> : null}
            <button type="submit">SIGN UP</button>
          </form>
        </main>
      </div>
    </div>
  );
}
export default SignUp;

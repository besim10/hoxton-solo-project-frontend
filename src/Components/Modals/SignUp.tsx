import { Props } from "./Modals";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import xIcon from "./../../icons/x-icon.svg";
function SignUp({ modal, setModal, setAdmin }: Props) {
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
          <form>
            <label>
              FULL NAME:
              <input type="email" name="email" />
            </label>
            <label>
              EMAIL:
              <input type="email" name="email" />
            </label>
            <label>
              PASSWORD:
              <input type="passwrod" name="password" />
            </label>

            <button type="submit">SIGN UP</button>
          </form>
        </main>
      </div>
    </div>
  );
}
export default SignUp;

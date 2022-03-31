import { Props } from "./Modals";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import xIcon from "./../../icons/x-icon.svg";
function SignIn({ modal, setModal }: Props) {
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
          <form>
            <label>
              EMAIL:
              <input type="email" name="email" />
            </label>
            <label>
              PASSWORD:
              <input type="passwrod" name="password" />
            </label>

            <button type="submit">LOG IN</button>
          </form>
        </main>
      </div>
    </div>
  );
}
export default SignIn;

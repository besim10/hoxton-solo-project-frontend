import { Admin } from "../../App";
import "./modals.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import SuccesfullyCreatedNewDoctor from "./SuccesfullyCreatedNewDoctor";
import SuccesfullyDeletedRecord from "./SuccesfullyDeletedRecord";
import SuccesfullySignedIn from "./SuccesfullySignedIn";
import SuccesfullyNewAdmin from "./SuccessfullyNewAdmin";

type Props = {
  modal: string;
  setModal: (value: string) => void;
  setAdmin: (value: Admin | null) => void;
};
function Modals({ modal, setModal, setAdmin }: Props) {
  switch (modal) {
    case "log-in":
      return <SignIn modal={modal} setModal={setModal} setAdmin={setAdmin} />;
    case "sign-up":
      return <SignUp modal={modal} setModal={setModal} setAdmin={setAdmin} />;
    case "success":
      return <SuccesfullySignedIn setModal={setModal} />;
    case "success-new-admin":
      return <SuccesfullyNewAdmin setModal={setModal} />;
    case "success-new-doctor":
      return <SuccesfullyCreatedNewDoctor setModal={setModal} />;
    case "success-delete-record":
      return <SuccesfullyDeletedRecord setModal={setModal} />;

    default:
      return null;
  }
}
export default Modals;

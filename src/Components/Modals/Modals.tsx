import { Admin } from "../../App";
import "./modals.css";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

export type Props = {
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

    default:
      return null;
  }
}
export default Modals;

import "./modals.css";

import SignIn from "./SignIn";

export type Props = {
  modal: string;
  setModal: (value: string) => void;
};
function Modals({ modal, setModal }: Props) {
  switch (modal) {
    case "log-in":
      return <SignIn modal={modal} setModal={setModal} />;

    default:
      return null;
  }
}
export default Modals;

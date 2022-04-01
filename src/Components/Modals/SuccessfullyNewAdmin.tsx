import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";

type Props = {
  setModal: (value: string) => void;
};
function SuccesfullyNewAdmin({ setModal }: Props) {
  const [state, setState] = useState({
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal } = state;
  const handleClose = () => {
    setModal("");
  };
  return (
    //@ts-ignore
    <Snackbar
      //@ts-ignore
      anchorOrigin={{ vertical, horizontal }}
      open
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        Succesfully created new Admin
      </Alert>
    </Snackbar>
  );
}
export default SuccesfullyNewAdmin;

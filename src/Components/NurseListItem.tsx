import IconButton from "@mui/material/IconButton";
import { Nurse } from "../App";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  nurse: Nurse;
  setModal: (value: string) => void;
  nurses: Nurse[];
  setNurses: (value: Nurse) => void;
};
function NurseListItem({ nurse, setModal, nurses, setNurses }: Props) {
  const [showDotsDropList, setShowDotsDropList] = useState(false);

  const deleteNurseFromServer = (id: number) => {
    fetch(`http://localhost:8000/nurses/${id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          let updatedNurses = [...nurses];
          updatedNurses = updatedNurses.filter((nurse) => nurse.id !== id);
          //@ts-ignore
          setNurses(updatedNurses);
          setModal("success-delete-record");
        }
      });
  };
  return (
    <tr className="doctor_table-item">
      <td className="image-wrapper">
        <img src={nurse.avatar} alt="" />
      </td>
      <td>{nurse.id}</td>
      <td>{nurse.fullName}</td>
      <td>{nurse.phoneNumber}</td>
      <td>{nurse.address}</td>
      <td>{nurse.salary} €</td>
      <td>{nurse?.department?.name}</td>
      <td>
        <IconButton
          aria-label="dots"
          className={"dots-button"}
          onClick={() => {
            setShowDotsDropList(!showDotsDropList);
          }}
        >
          <MoreVertIcon />
          {showDotsDropList ? (
            <ul className="dots-dropdown__list">
              <Link to={`/nurses/${nurse.id}`}>
                <li className="dots-dropdown__list-item">
                  <EditIcon />
                  Edit
                </li>
              </Link>
              <li
                className="dots-dropdown__list-item"
                onClick={() => {
                  deleteNurseFromServer(nurse.id);
                }}
              >
                <DeleteIcon />
                Delete
              </li>
            </ul>
          ) : null}
        </IconButton>
      </td>
    </tr>
  );
}
export default NurseListItem;

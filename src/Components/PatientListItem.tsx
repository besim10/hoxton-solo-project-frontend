import IconButton from "@mui/material/IconButton";
import { Doctor, Patient } from "../App";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  patient: Patient;
  setModal: (value: string) => void;
  patients: Patient[];
  setPatients: (value: Patient) => void;
};
function PatientListItem({ patient, setModal, patients, setPatients }: Props) {
  const [showDotsDropList, setShowDotsDropList] = useState(false);

  const deletePatientFromServer = (id: number) => {
    fetch(`http://localhost:8000/patients/${id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          let updatedPatients = [...patients];
          updatedPatients = updatedPatients.filter(
            (patient) => patient.id !== id
          );
          //@ts-ignore
          setPatients(updatedPatients);
          setModal("success-delete-record");
        }
      });
  };
  return (
    <tr className="doctor_table-item">
      <td className="image-wrapper">
        <img src={patient.avatar} alt="" />
      </td>
      <td>{patient.id}</td>
      <td>{patient.fullName}</td>
      <td>{patient.phoneNumber}</td>
      <td>{patient.address}</td>
      <td>{patient.gender}</td>
      <td>{patient.appointments.length}</td>
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
              <Link to={`/patients/${patient.id}`}>
                <li className="dots-dropdown__list-item">
                  <EditIcon />
                  Edit
                </li>
              </Link>
              <li
                className="dots-dropdown__list-item"
                onClick={() => {
                  deletePatientFromServer(patient.id);
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
export default PatientListItem;

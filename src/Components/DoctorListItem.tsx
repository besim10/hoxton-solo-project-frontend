import IconButton from "@mui/material/IconButton";
import { Doctor } from "../App";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

type Props = {
  doctor: Doctor;
  setModal: (value: string) => void;
  doctors: Doctor[];
  setDoctors: (value: Doctor) => void;
};
function DoctorListItem({ doctor, setModal, doctors, setDoctors }: Props) {
  const [showDotsDropList, setShowDotsDropList] = useState(false);

  const deleteDoctorFromServer = (id: number) => {
    fetch(`http://localhost:8000/doctors/${id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          let updatedDoctors = [...doctors];
          updatedDoctors = updatedDoctors.filter((doctor) => doctor.id !== id);
          //@ts-ignore
          setDoctors(updatedDoctors);
          setModal("success-delete-record");
        }
      });
  };
  return (
    <tr className="doctor_table-item">
      <td className="image-wrapper">
        <img src={doctor.avatar} alt="" />
      </td>
      <td>{doctor.id}</td>
      <td>{doctor.fullName}</td>
      <td>{doctor.phoneNumber}</td>
      <td>{doctor.address}</td>
      <td>{doctor.salary} €</td>
      <td>{doctor?.department?.name}</td>
      <td>{doctor?.appointments?.length}</td>
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
              <li className="dots-dropdown__list-item">
                <EditIcon />
                Edit
              </li>
              <li
                className="dots-dropdown__list-item"
                onClick={() => {
                  deleteDoctorFromServer(doctor.id);
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
export default DoctorListItem;

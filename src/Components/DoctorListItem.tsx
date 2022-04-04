import IconButton from "@mui/material/IconButton";
import { Doctor } from "../App";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";

type Props = {
  doctor: Doctor;
  index: number;
};
function DoctorListItem({ doctor, index }: Props) {
  const [showDotsDropList, setShowDotsDropList] = useState(false);

  return (
    <tr className="doctor_table-item" key={index}>
      <td className="image-wrapper">
        <img src={doctor.avatar} alt="" />
      </td>
      <td>{doctor.id}</td>
      <td>{doctor.fullName}</td>
      <td>{doctor.phoneNumber}</td>
      <td>{doctor.address}</td>
      <td>{doctor.salary.toFixed(3)} €</td>
      <td>{doctor.department.name}</td>
      <td>{doctor.appointments.length}</td>
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
            <ul className="dots-dropdown">
              <li>Edit</li>
              <li>Delete</li>
            </ul>
          ) : null}
        </IconButton>
      </td>
    </tr>
  );
}
export default DoctorListItem;

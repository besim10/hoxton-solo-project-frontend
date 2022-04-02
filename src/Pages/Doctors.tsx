import Button from "@mui/material/Button";
import { Doctor } from "../App";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { useState } from "react";

type Props = {
  doctors: Doctor[];
};
function Doctors({ doctors }: Props) {
  const [showDotsDropList, setShowDotsDropList] = useState(false);
  if (doctors.length === 0) return <h1>Loading...</h1>;
  return (
    <main className="info-main doctors-main">
      <div className="info-main__header">
        <h2>Doctors</h2>
        <Button size="medium" variant="contained" startIcon={<AddIcon />}>
          Add Doctor
        </Button>
      </div>
      <section className="info-main__search">
        <input type="search" name="search" placeholder="Search by Email" />
        <Button size="large" variant="outlined">
          <PersonSearchIcon sx={{ fontSize: 30 }} />
        </Button>
      </section>
      <table className="doctors-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>ID</th>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Salary</th>
            <th>Department</th>
            <th>Appointments</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
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
          ))}
        </tbody>
      </table>
    </main>
  );
}
export default Doctors;

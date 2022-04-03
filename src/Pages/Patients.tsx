import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Patient } from "../App";
import IconButton from "@mui/material/IconButton";

type Props = {
  patients: Patient[];
};
function Patients({ patients }: Props) {
  return (
    <main className="info-main doctors-main">
      <div className="info-main__header">
        <h2>Patients</h2>
        <Button size="medium" variant="contained" startIcon={<AddIcon />}>
          Add Patient
        </Button>
      </div>
      <section className="info-main__search">
        <input type="search" name="search" placeholder="Search by Full Name" />
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
            <th>Gender</th>
            <th>Appointments</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr className="doctor_table-item" key={index}>
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
                <IconButton aria-label="dots" className={"dots-button"}>
                  <MoreVertIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
export default Patients;

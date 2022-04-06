import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Patient } from "../App";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import PatientListItem from "../Components/PatientListItem";

type Props = {
  patients: Patient[];
  setPatients: (value: Patient) => void;
  setModal: (value: string) => void;
};
function Patients({ patients, setPatients, setModal }: Props) {
  const navigate = useNavigate();
  return (
    <main className="info-main doctors-main">
      <div className="info-main__header">
        <h2>Patients</h2>
        <Button
          size="medium"
          onClick={() => {
            navigate("/addPatient");
          }}
          variant="contained"
          startIcon={<AddIcon />}
        >
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
            <PatientListItem
              patient={patient}
              key={index}
              patients={patients}
              setPatients={setPatients}
              setModal={setModal}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}
export default Patients;

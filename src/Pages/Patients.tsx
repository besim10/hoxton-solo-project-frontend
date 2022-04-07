import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Patient } from "../App";
import { useNavigate } from "react-router-dom";
import PatientListItem from "../Components/PatientListItem";
import { useState } from "react";

type Props = {
  patients: Patient[];
  setPatients: (value: Patient) => void;
  setModal: (value: string) => void;
};
function Patients({ patients, setPatients, setModal }: Props) {
  const [search, setSearch] = useState("");
  const patientsToShow = () => {
    return patients.filter((patient) =>
      patient.fullName.toUpperCase().includes(search.toUpperCase())
    );
  };

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
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="search"
          name="search"
          placeholder="Search by Full Name"
        />
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
          {patientsToShow().map((patient, index) => (
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

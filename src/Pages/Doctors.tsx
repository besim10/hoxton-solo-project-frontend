import Button from "@mui/material/Button";
import { Doctor } from "../App";
import AddIcon from "@mui/icons-material/Add";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import DoctorListItem from "../Components/DoctorListItem";
import { useNavigate } from "react-router-dom";

type Props = {
  doctors: Doctor[];
  setModal: (value: string) => void;
  setDoctors: (value: Doctor) => void;
};
function Doctors({ doctors, setModal, setDoctors }: Props) {
  const navigate = useNavigate();
  if (doctors.length === 0) return <h1>Loading...</h1>;
  return (
    <main className="info-main doctors-main">
      <div className="info-main__header">
        <h2>Doctors</h2>
        <Button
          onClick={() => {
            navigate("/addDoctor");
          }}
          size="medium"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add Doctor
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
            <th>Salary</th>
            <th>Department</th>
            <th>Appointments</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, index) => (
            <DoctorListItem
              doctor={doctor}
              key={index}
              setModal={setModal}
              doctors={doctors}
              setDoctors={setDoctors}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}
export default Doctors;

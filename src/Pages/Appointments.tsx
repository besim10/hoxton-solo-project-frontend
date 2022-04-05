import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Appointment } from "../App";
import AppointmentListItem from "../Components/AppointmentListItem";
import { useNavigate } from "react-router-dom";

type Props = {
  appointments: Appointment[];
  setAppointments: (value: Appointment) => void;
  setModal: (value: string) => void;
};
function Appointments({ appointments, setAppointments, setModal }: Props) {
  const navigate = useNavigate();
  return (
    <main className="info-main doctors-main">
      <div className="info-main__header">
        <h2>Appointments</h2>
        <Button
          onClick={() => {
            navigate("/addAppointment");
          }}
          size="medium"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Make Appointment
        </Button>
      </div>
      <section className="info-main__search">
        <input
          type="search"
          name="search"
          placeholder="Patient/Doctor Full Name"
        />
        <Button size="large" variant="outlined">
          <PersonSearchIcon sx={{ fontSize: 30 }} />
        </Button>
      </section>
      <table className="doctors-table">
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Patient ID</th>
            <th>Patient Full Name</th>
            <th>Doctor ID</th>
            <th>Doctor Full Name</th>
            <th>Date and Time</th>
            <th>Status</th>
            <th>Treatment</th>
            <th>Payment</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <AppointmentListItem
              appointment={appointment}
              appointments={appointments}
              setAppointments={setAppointments}
              setModal={setModal}
              key={index}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}
export default Appointments;

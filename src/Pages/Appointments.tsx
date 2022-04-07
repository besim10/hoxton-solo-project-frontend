import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Appointment } from "../App";
import AppointmentListItem from "../Components/AppointmentListItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type Props = {
  appointments: Appointment[];
  setAppointments: (value: Appointment) => void;
  setModal: (value: string) => void;
};
function Appointments({ appointments, setAppointments, setModal }: Props) {
  const [search, setSearch] = useState("");
  const appointmentsToShow = () => {
    return appointments.filter(
      (appointment) =>
        appointment.patient.fullName
          .toUpperCase()
          .includes(search.toUpperCase()) ||
        appointment.doctor.fullName.toUpperCase().includes(search.toUpperCase())
    );
  };
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
          onChange={(e) => {
            setSearch(e.target.value);
          }}
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
          {appointmentsToShow().map((appointment, index) => (
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

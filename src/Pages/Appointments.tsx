import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Appointment } from "../App";

type Props = {
  appointments: Appointment[];
};
function Appointments({ appointments }: Props) {
  return (
    <main className="info-main doctors-main">
      <div className="info-main__header">
        <h2>Appointments</h2>
        <Button size="medium" variant="contained" startIcon={<AddIcon />}>
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
            <tr className="doctor_table-item" key={index}>
              <td>{appointment.id}</td>
              <td>{appointment.patient.id}</td>
              <td>{appointment.patient.fullName}</td>
              <td>{appointment.doctor.id}</td>
              <td>{appointment.doctor.fullName}</td>
              <td>{appointment.dateAndTime}</td>
              <td className={`${appointment.status}`}>{appointment.status}</td>
              {appointment.treatment === null ? (
                <td>Not treated</td>
              ) : (
                <td>{appointment.treatment}</td>
              )}
              {appointment.payment === null ? (
                <td>Null</td>
              ) : (
                <td>{appointment.payment.toFixed(2)} €</td>
              )}
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
export default Appointments;

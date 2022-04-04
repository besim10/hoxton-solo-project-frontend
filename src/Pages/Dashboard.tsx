import { Appointment, Doctor, Nurse, Patient } from "../App";
import doctorIcon from "../icons/dashboard-doctor-icon.svg";
import nurseIcon from "../icons/dashboard-nurse-icon.svg";
import patientIcon from "../icons/dashboard-patient-icon.svg";
import appointmentIcon from "../icons/dashboard-appointment-icon.svg";

type Props = {
  doctors: Doctor[];
  nurses: Nurse[];
  patients: Patient[];
  appointments: Appointment[];
};
function Dashboard({ doctors, nurses, patients, appointments }: Props) {
  if (doctors.length === 0) return <h1>Loading</h1>;
  return (
    <main className="info-main">
      <ul className="dashboard-list">
        <li className="dashboard-list__item">
          <div className="dashboard-list__item__img doctor_item">
            <img src={doctorIcon} alt="" />
          </div>
          <div className="dashboard-list__item__info doctor_item__info">
            <span>{doctors.length}</span>
            <p>Doctors</p>
          </div>
        </li>
        <li className="dashboard-list__item">
          <div className="dashboard-list__item__img nurse_item">
            <img src={nurseIcon} alt="" />
          </div>
          <div className="dashboard-list__item__info nurse_item__info">
            <span>{nurses.length}</span>
            <p>Nurses</p>
          </div>
        </li>
        <li className="dashboard-list__item">
          <div className="dashboard-list__item__img patient_item">
            <img src={patientIcon} alt="" />
          </div>
          <div className="dashboard-list__item__info patient_item__info">
            <span>{patients.length}</span>
            <p>Patients</p>
          </div>
        </li>
        <li className="dashboard-list__item">
          <div className="dashboard-list__item__img appointment_item">
            <img src={appointmentIcon} alt="" />
          </div>
          <div className="dashboard-list__item__info appointment_item__info">
            <span>{appointments.length}</span>
            <p>Appointments</p>
          </div>
        </li>
      </ul>
    </main>
  );
}
export default Dashboard;

import { useNavigate } from "react-router-dom";
import { Appointment, Doctor, Patient } from "../App";

type Props = {
  appointments: Appointment[];
  setAppointments: (value: Appointment) => void;
  setModal: (value: string) => void;
  patients: Patient[];
  setPatients: (value: Patient) => void;
  doctors: Doctor[];
  setDoctors: (value: Doctor) => void;
};
function AddAppointment({
  appointments,
  setAppointments,
  setModal,
  patients,
  setPatients,
  doctors,
  setDoctors,
}: Props) {
  const navigate = useNavigate();

  const addAppointmentWithNewPatient = (data: any) => {
    fetch(`http://localhost:8000/appointmentWithNewPatient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          let updatedAppointments = [...appointments];
          //@ts-ignore
          setAppointments([...updatedAppointments, data.appointment]);
          let updatedPatients = [...patients];
          //@ts-ignore
          setPatients([...updatedPatients, data.patient]);
          setModal("success-new-appointment");
          navigate("/appointments");
        }
      });
  };

  const handleSubmitNewPatient = (e: any) => {
    e.preventDefault();

    const data = {
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      phoneNumber: e.target.phoneNumber.value,
      address: e.target.address.value,
      gender: e.target.gender.value,
      avatar: e.target.avatar.value,
      doctorId: Number(e.target.doctor.value),
    };
    addAppointmentWithNewPatient(data);
  };

  function addAppointmentToServer(data: any) {
    fetch(`http://localhost:8000/appointments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          let updatedAppointments = [...appointments];
          //@ts-ignore
          setAppointments([...updatedAppointments, data]);
          setModal("success-new-appointment");
          navigate("/appointments");
        }
      });
  }
  const handleSubmitExistingPatient = (e: any) => {
    e.preventDefault();
    const data = {
      patientId: Number(e.target.patient.value),
      doctorId: Number(e.target.doctor.value),
    };
    addAppointmentToServer(data);
  };
  if (appointments.length === 0) return <h3>Loading</h3>;

  return (
    <main className="info-main form-main">
      <h3>Add Appointment</h3>
      <div className="forms-container">
        <form
          onSubmit={handleSubmitNewPatient}
          className="general-form new-pacient-form"
        >
          <h3>New Pacient Form</h3>
          <label>
            Full Name
            <input type="text" name="fullName" required />
          </label>
          <label>
            Email
            <input type="email" name="email" required />
          </label>
          <label>
            Phone Number
            <input type="text" name="phoneNumber" required />
          </label>
          <label>
            Address
            <input type="text" name="address" required />
          </label>
          <select name="gender" defaultValue={""} required>
            <option value="" disabled>
              Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <label>
            Avatar
            <input type="text" name="avatar" required />
          </label>
          <select name="doctor" defaultValue={""} required>
            <option value="" disabled>
              Doctor
            </option>
            {doctors.map((doctor, index) => (
              <option value={`${doctor.id}`} key={index}>
                {doctor.fullName}
              </option>
            ))}
          </select>
          <button type="submit">Create</button>
        </form>
        <form
          onSubmit={handleSubmitExistingPatient}
          className="general-form existing-pacient-form"
        >
          <h3>Existing Patient </h3>
          <select name="patient" defaultValue={""} required>
            <option value="" disabled>
              Patient
            </option>
            {patients.map((patient, index) => (
              <option value={`${patient.id}`} key={index}>
                {patient.fullName}
              </option>
            ))}
          </select>
          <select name="doctor" defaultValue={""} required>
            <option value="" disabled>
              Doctor
            </option>
            {doctors.map((doctor, index) => (
              <option value={`${doctor.id}`} key={index}>
                {doctor.fullName}
              </option>
            ))}
          </select>
          <button type="submit">Create</button>
        </form>
      </div>
    </main>
  );
}
export default AddAppointment;

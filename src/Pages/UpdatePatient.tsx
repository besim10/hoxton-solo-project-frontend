import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Department, Nurse, Patient } from "../App";

type Props = {
  departments: Department[];
  patients: Patient[];
  setPatients: (value: Patient) => void;
  setModal: (value: string) => void;
};
function UpdatePatient({
  departments,
  patients,
  setPatients,
  setModal,
}: Props) {
  const [patient, setPatient] = useState<Patient | null>(null);
  const navigate = useNavigate();
  const param = useParams();
  useEffect(() => {
    fetch(`http://localhost:8000/patients/${param.id}`)
      .then((resp) => resp.json())
      .then((data) => setPatient(data));
  }, []);

  const updatePatientToServer = (data: any) => {
    fetch(`http://localhost:8000/patients/${patient?.id}`, {
      method: "PATCH",
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
          let updatedPatients = [...patients];

          updatedPatients = updatedPatients.map((el) =>
            el.id === patient?.id ? data : el
          );
          //@ts-ignore
          setPatients(updatedPatients);
          setModal("success-update-record");
          navigate("/patients");
        }
      });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      fullName: e.target.fullName.value,
      email: e.target.email.value,
      phoneNumber: e.target.phoneNumber.value,
      address: e.target.address.value,
      gender: e.target.gender.value,
      avatar: e.target.avatar.value,
    };
    updatePatientToServer(data);
  };
  if (patient === null) return <h1>Loading...</h1>;
  return (
    <main className="info-main form-main">
      <h3>Update Patient</h3>
      <form onSubmit={handleSubmit} className="general-form">
        <div className="general-form_firstSection">
          <label>
            Full Name
            <input
              type="text"
              defaultValue={patient.fullName}
              name="fullName"
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              defaultValue={patient.email}
              name="email"
              required
            />
          </label>
          <label>
            Phone Number
            <input
              type="text"
              defaultValue={patient.phoneNumber}
              name="phoneNumber"
              required
            />
          </label>
          <label>
            Address
            <input
              type="text"
              defaultValue={patient.address}
              name="address"
              required
            />
          </label>
          <select name="gender" defaultValue={patient.gender} required>
            <option value="" disabled>
              Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="general-form_secondSection">
          <label>
            Avatar
            <input
              type="text"
              defaultValue={patient.avatar}
              name="avatar"
              required
            />
          </label>
          <button type="submit">Update</button>
        </div>
      </form>
    </main>
  );
}
export default UpdatePatient;

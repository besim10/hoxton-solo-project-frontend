import { useNavigate } from "react-router-dom";
import { Patient } from "../App";

type Props = {
  patients: Patient[];
  setPatients: (value: Patient) => void;
  setModal: (value: string) => void;
};
function AddPatient({ patients, setPatients, setModal }: Props) {
  const navigate = useNavigate();
  const addPatientToServer = (data: any) => {
    fetch(`http://localhost:8000/patients`, {
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
          let updatedPatients = [...patients];
          //@ts-ignore
          setPatients([...updatedPatients, data]);
          setModal("success-new-patient");
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
    addPatientToServer(data);
  };
  return (
    <main className="info-main form-main">
      <h3>Add Patient</h3>
      <form onSubmit={handleSubmit} className="general-form">
        <div className="general-form_firstSection">
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
          <button type="submit">Submit</button>
        </div>
      </form>
    </main>
  );
}
export default AddPatient;

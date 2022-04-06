import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Department, Doctor } from "../App";

type Props = {
  departments: Department[];
  doctors: Doctor[];
  setDoctors: (value: Doctor) => void;
  setModal: (value: string) => void;
};
function UpdateDoctor({ departments, doctors, setDoctors, setModal }: Props) {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const navigate = useNavigate();
  const param = useParams();
  useEffect(() => {
    fetch(`http://localhost:8000/doctors/${param.id}`)
      .then((resp) => resp.json())
      .then((data) => setDoctor(data));
  }, []);

  const updateDoctorToServer = (data: any) => {
    fetch(`http://localhost:8000/doctors/${doctor?.id}`, {
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
          let updatedDoctors = [...doctors];

          updatedDoctors = updatedDoctors.map((el) =>
            el.id === doctor?.id ? data : el
          );
          //@ts-ignore
          setDoctors(updatedDoctors);
          setModal("success-update-record");
          navigate("/doctors");
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
      salary: Number(e.target.salary.value),
      departmentId: Number(e.target.department.value),
    };
    updateDoctorToServer(data);
  };
  if (doctor === null) return <h1>Loading...</h1>;
  return (
    <main className="info-main form-main">
      <h3>Update Doctor</h3>
      <form onSubmit={handleSubmit} className="general-form">
        <div className="general-form_firstSection">
          <label>
            Full Name
            <input
              type="text"
              defaultValue={doctor.fullName}
              name="fullName"
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              defaultValue={doctor.email}
              name="email"
              required
            />
          </label>
          <label>
            Phone Number
            <input
              type="text"
              defaultValue={doctor.phoneNumber}
              name="phoneNumber"
              required
            />
          </label>
          <label>
            Address
            <input
              type="text"
              defaultValue={doctor.address}
              name="address"
              required
            />
          </label>
        </div>
        <div className="general-form_secondSection">
          <select name="gender" defaultValue={doctor.gender} required>
            <option value="" disabled>
              Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <label>
            Avatar
            <input
              type="text"
              defaultValue={doctor.avatar}
              name="avatar"
              required
            />
          </label>
          <label>
            Salary
            <input
              type="text"
              defaultValue={doctor.salary}
              name="salary"
              required
            />
          </label>

          <select name="department" defaultValue={doctor.departmentId} required>
            <option value="" disabled>
              Department
            </option>
            {departments.map((department, index) => (
              <option value={`${department.id}`} key={index}>
                {department.name}
              </option>
            ))}
          </select>
          <button type="submit">Update</button>
        </div>
      </form>
    </main>
  );
}
export default UpdateDoctor;

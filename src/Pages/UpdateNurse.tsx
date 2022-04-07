import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Department, Nurse } from "../App";

type Props = {
  departments: Department[];
  nurses: Nurse[];
  setNurses: (value: Nurse) => void;
  setModal: (value: string) => void;
};
function UpdateNurse({ departments, nurses, setNurses, setModal }: Props) {
  const [nurse, setNurse] = useState<Nurse | null>(null);
  const navigate = useNavigate();
  const param = useParams();
  useEffect(() => {
    fetch(`http://localhost:8000/nurses/${param.id}`)
      .then((resp) => resp.json())
      .then((data) => setNurse(data));
  }, []);

  const updateNurseToServer = (data: any) => {
    fetch(`http://localhost:8000/nurses/${nurse?.id}`, {
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
          let updatedNurses = [...nurses];

          updatedNurses = updatedNurses.map((el) =>
            el.id === nurse?.id ? data : el
          );
          //@ts-ignore
          setNurses(updatedNurses);
          setModal("success-update-record");
          navigate("/nurses");
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
      avatar: e.target.avatar.value,
      salary: Number(e.target.salary.value),
      departmentId: Number(e.target.department.value),
    };
    updateNurseToServer(data);
  };
  if (nurse === null) return <h1>Loading...</h1>;
  return (
    <main className="info-main form-main">
      <h3>Update Nurse</h3>
      <form onSubmit={handleSubmit} className="general-form">
        <div className="general-form_firstSection">
          <label>
            Full Name
            <input
              type="text"
              defaultValue={nurse.fullName}
              name="fullName"
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              defaultValue={nurse.email}
              name="email"
              required
            />
          </label>
          <label>
            Phone Number
            <input
              type="text"
              defaultValue={nurse.phoneNumber}
              name="phoneNumber"
              required
            />
          </label>
          <label>
            Address
            <input
              type="text"
              defaultValue={nurse.address}
              name="address"
              required
            />
          </label>
        </div>
        <div className="general-form_secondSection">
          <label>
            Avatar
            <input
              type="text"
              defaultValue={nurse.avatar}
              name="avatar"
              required
            />
          </label>
          <label>
            Salary
            <input
              type="text"
              defaultValue={nurse.salary}
              name="salary"
              required
            />
          </label>

          <select name="department" defaultValue={nurse.departmentId} required>
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
export default UpdateNurse;

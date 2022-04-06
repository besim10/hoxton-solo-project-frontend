import { useNavigate } from "react-router-dom";
import { Department, Doctor, Nurse } from "../App";

type Props = {
  departments: Department[];
  nurses: Nurse[];
  setNurses: (value: Nurse) => void;
  setModal: (value: string) => void;
};
function AddNurse({ departments, nurses, setNurses, setModal }: Props) {
  const navigate = useNavigate();
  const addNurseToServer = (data: any) => {
    fetch(`http://localhost:8000/nurses`, {
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
          let updatedNurses = [...nurses];
          //@ts-ignore
          setNurses([...updatedNurses, data]);
          setModal("success-new-nurse");
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
      employeedAt: e.target.employeedAt.value,
      salary: Number(e.target.salary.value),
      departmentId: Number(e.target.department.value),
    };
    addNurseToServer(data);
  };
  if (departments.length === 0) return <h3>Loading</h3>;

  return (
    <main className="info-main form-main">
      <h3>Add Nurse</h3>
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
        </div>
        <div className="general-form_secondSection">
          <label>
            Avatar
            <input type="text" name="avatar" required />
          </label>
          <label>
            Employed Date
            <input type="date" name="employeedAt" required />
          </label>
          <label>
            Salary
            <input type="text" name="salary" placeholder="Ex: 2.5" required />
          </label>

          <select name="department" defaultValue={""} required>
            <option value="" disabled>
              Department
            </option>
            {departments.map((department, index) => (
              <option value={`${department.id}`} key={index}>
                {department.name}
              </option>
            ))}
          </select>
          <button type="submit">Submit</button>
        </div>
      </form>
    </main>
  );
}
export default AddNurse;

import { useNavigate } from "react-router-dom";
import { Department, Doctor } from "../App";

type Props = {
  departments: Department[];
  setDepartments: (value: Department) => void;
  setModal: (value: string) => void;
};
function AddDepartment({ departments, setDepartments, setModal }: Props) {
  const navigate = useNavigate();
  const addDepartmentToServer = (data: any) => {
    fetch(`http://localhost:8000/departments`, {
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
          let updatedDepartments = [...departments];
          //@ts-ignore
          setDepartments([...updatedDepartments, data]);
          setModal("success-new-department");
          navigate("/departments");
        }
      });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      rooms: Number(e.target.rooms.value),
      hospitalId: 1,
    };
    addDepartmentToServer(data);
  };
  if (departments.length === 0) return <h3>Loading</h3>;

  return (
    <main className="info-main form-main">
      <h3>Add Department</h3>
      <form onSubmit={handleSubmit} className="general-form">
        <div className="general-form_firstSection">
          <label>
            Name
            <input type="text" name="name" required />
          </label>
          <label>
            Rooms
            <input type="number" name="rooms" required />
          </label>
          <button type="submit">Submit</button>
        </div>
      </form>
    </main>
  );
}
export default AddDepartment;

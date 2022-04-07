import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Department } from "../App";

type Props = {
  departments: Department[];
  setDepartments: (value: Department) => void;
  setModal: (value: string) => void;
};
function UpdateDepartment({ departments, setDepartments, setModal }: Props) {
  const [department, setDepartment] = useState<Department | null>(null);
  const navigate = useNavigate();
  const param = useParams();
  useEffect(() => {
    fetch(`http://localhost:8000/departments/${param.id}`)
      .then((resp) => resp.json())
      .then((data) => setDepartment(data));
  }, []);

  const updateDepartmentToServer = (data: any) => {
    fetch(`http://localhost:8000/departments/${department?.id}`, {
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
          let updatedDepartments = [...departments];

          updatedDepartments = updatedDepartments.map((el) =>
            el.id === department?.id ? data : el
          );
          //@ts-ignore
          setDepartments(updatedDepartments);
          setModal("success-update-record");
          navigate("/departments");
        }
      });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      name: e.target.name.value,
      rooms: Number(e.target.rooms.value),
    };
    updateDepartmentToServer(data);
  };
  if (department === null) return <h1>Loading...</h1>;
  return (
    <main className="info-main form-main">
      <h3>Update Department</h3>
      <form onSubmit={handleSubmit} className="general-form">
        <div className="general-form_firstSection">
          <label>
            Name
            <input
              type="text"
              name="name"
              defaultValue={department.name}
              required
            />
          </label>
          <label>
            Rooms
            <input
              type="number"
              defaultValue={department.rooms}
              name="rooms"
              required
            />
          </label>
          <button type="submit">Update</button>
        </div>
      </form>
    </main>
  );
}
export default UpdateDepartment;

import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Department } from "../App";
import { useNavigate } from "react-router-dom";
import DepartmentListItem from "../Components/DepartmentListItem";
import { useState } from "react";

type Props = {
  departments: Department[];
  setDepartments: (value: Department) => void;
  setModal: (value: string) => void;
};
function Departments({ departments, setDepartments, setModal }: Props) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const departmentsToShow = () => {
    return departments.filter((department) =>
      department.name.toUpperCase().includes(search.toUpperCase())
    );
  };
  return (
    <main className="info-main doctors-main">
      <div className="info-main__header">
        <h2>Departments</h2>
        <Button
          onClick={() => {
            navigate("/addDepartment");
          }}
          size="medium"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add Department
        </Button>
      </div>
      <section className="info-main__search">
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="search"
          name="search"
          placeholder="Search by Name"
        />
        <Button size="large" variant="outlined">
          <PersonSearchIcon sx={{ fontSize: 30 }} />
        </Button>
      </section>
      <ul className="departments-list">
        {departmentsToShow().map((department, index) => (
          <DepartmentListItem
            departments={departments}
            setDepartments={setDepartments}
            setModal={setModal}
            department={department}
            key={index}
          />
        ))}
      </ul>
    </main>
  );
}
export default Departments;

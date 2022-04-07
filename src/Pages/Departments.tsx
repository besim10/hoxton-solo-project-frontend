import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Department } from "../App";
import { useNavigate } from "react-router-dom";
import DepartmentListItem from "../Components/DepartmentListItem";

type Props = {
  departments: Department[];
  setDepartments: (value: Department) => void;
  setModal: (value: string) => void;
};
function Departments({ departments, setDepartments, setModal }: Props) {
  const navigate = useNavigate();
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
        <input type="search" name="search" placeholder="Search by Name" />
        <Button size="large" variant="outlined">
          <PersonSearchIcon sx={{ fontSize: 30 }} />
        </Button>
      </section>
      <ul className="departments-list">
        {departments.map((department, index) => (
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

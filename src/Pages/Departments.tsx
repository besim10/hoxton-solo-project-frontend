import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Department } from "../App";

type Props = {
  departments: Department[];
};
function Departments({ departments }: Props) {
  return (
    <main className="info-main doctors-main">
      <div className="info-main__header">
        <h2>Departments</h2>
        <Button size="medium" variant="contained" startIcon={<AddIcon />}>
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
        {departments.map((department) => (
          <li className="departments-list__item">
            <h3>{department.name}</h3>
            <ul className="department_list_description">
              <li>
                ID: <span>{department.id}</span>
              </li>
              <li>
                Rooms: <span>{department.rooms}</span>
              </li>
              <li>
                Doctors: <span>{department.doctors.length}</span>{" "}
              </li>
              <li>
                Nurses: <span>{department.nurses.length}</span>
              </li>
            </ul>
          </li>
        ))}
      </ul>
    </main>
  );
}
export default Departments;

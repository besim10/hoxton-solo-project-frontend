import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Department } from "../App";
import { Link } from "react-router-dom";
import { useState } from "react";

type Props = {
  department: Department;
  departments: Department[];
  setDepartments: (value: Department) => void;
  setModal: (value: string) => void;
};
function DepartmentListItem({
  department,
  departments,
  setDepartments,
  setModal,
}: Props) {
  const [showDotsDropList, setShowDotsDropList] = useState(false);

  if (department === null) return <h1>Loading...</h1>;
  return (
    <li className="departments-list__item">
      <h3>{department.name}</h3>
      <div>
        <IconButton
          aria-label="dots"
          className={"dots-button department-section"}
          onClick={() => {
            setShowDotsDropList(!showDotsDropList);
          }}
        >
          <MoreVertIcon />
          {showDotsDropList ? (
            <ul className="dots-dropdown__list">
              <Link to={`/departments/${department.id}`}>
                <li className="dots-dropdown__list-item">
                  <EditIcon />
                  Edit
                </li>
              </Link>
            </ul>
          ) : null}
        </IconButton>
      </div>
      <ul className="department_list_description">
        <li>
          ID: <span>{department?.id}</span>
        </li>
        <li>
          Rooms: <span>{department?.rooms}</span>
        </li>
        <li>
          Doctors: <span>{department?.doctors.length}</span>
        </li>
        <li>
          Nurses: <span>{department?.nurses.length}</span>
        </li>
      </ul>
    </li>
  );
}
export default DepartmentListItem;

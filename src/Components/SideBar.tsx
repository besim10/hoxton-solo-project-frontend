import QueryStatsIcon from "@mui/icons-material/QueryStats";
import doctorIcon from "../icons/doctor-icon.svg";
import nurseIcon from "../icons/nurse-icon.svg";
import patientIcon from "../icons/patient-icon.svg";
import appointmentIcon from "../icons/appointment-icon.svg";
import departmentIcon from "../icons/department-icon.svg";
import payrollIcon from "../icons/payroll-icon.svg";
import { NavLink } from "react-router-dom";

function SideBar() {
  return (
    <aside className="side-bar">
      <h3>Main</h3>
      <ul className="side-bar-list">
        <li className="side-bar-list__item">
          <NavLink to="/dashboard">
            <QueryStatsIcon />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li className="side-bar-list__item">
          <NavLink to="/doctors">
            <img src={doctorIcon} alt="" />
            <span>Doctors</span>
          </NavLink>
        </li>
        <li className="side-bar-list__item">
          <NavLink to="/nurses">
            <img src={nurseIcon} alt="" />
            <span>Nurses</span>
          </NavLink>
        </li>
        <li className="side-bar-list__item">
          <NavLink to="/patients">
            <img src={patientIcon} alt="" />
            <span>Patients</span>
          </NavLink>
        </li>
        <li className="side-bar-list__item">
          <NavLink to="/appointments">
            <img src={appointmentIcon} alt="" />
            <span>Appointments</span>
          </NavLink>
        </li>
        <li className="side-bar-list__item">
          <NavLink to="departments">
            <img src={departmentIcon} alt="" />
            <span>Departments</span>
          </NavLink>
        </li>
        <li className="side-bar-list__item">
          <NavLink to="payrolls">
            <img src={payrollIcon} alt="" />
            <span>Payroll</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
export default SideBar;

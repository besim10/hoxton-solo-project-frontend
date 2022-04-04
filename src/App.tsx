import "./index.css";
import Header from "./Components/Header";
import { Navigate, Route, Routes } from "react-router-dom";
import Intro from "./Pages/Intro";
import PageNotFound from "./Pages/PageNotFound";
import { useEffect, useState } from "react";
import SideBar from "./Components/SideBar";
import Dashboard from "./Pages/Dashboard";
import Doctors from "./Pages/Doctors";
import Nurses from "./Pages/Nurses";
import Patients from "./Pages/Patients";
import Appointments from "./Pages/Appointments";
import Departments from "./Pages/Departments";
import Payroll from "./Pages/Payroll";
import Modals from "./Components/Modals/Modals";

export type Admin = {
  id: number;
  fullName: string;
  email: string;
  password: string;
  avatar: string;
  hospitalId: number;
};
export type Department = {
  id: number;
  name: string;
  hospitalId: number;
  rooms: number;
  doctors: Doctor[];
  nurses: Nurse[];
};
export type Appointment = {
  id: number;
  patientId: number;
  doctorId: number;
  dateAndTime: string;
  status: string;
  treatment: string;
  payment: number;
  patient: Patient;
  doctor: Doctor;
};
export type Doctor = {
  id: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  gender: string;
  avatar: string;
  employeedAt: string;
  salary: number;
  departmentId: number;
  department: Department;
  appointments: Appointment[];
};
export type Nurse = {
  id: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  avatar: string;
  employeedAt: string;
  salary: number;
  departmentId: number;
  department: Department;
};
export type Patient = {
  id: number;
  email: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  avatar: string;
  gender: string;
  appointments: Appointment[];
};
function App() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [modal, setModal] = useState("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [nurses, setNurses] = useState<Nurse[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    if (localStorage.token)
      fetch("http://localhost:8000/validate", {
        headers: {
          Authorization: localStorage.token,
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.error) console.log(data);
          else {
            setAdmin(data);
          }
        });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:8000/doctors`)
      .then((resp) => resp.json())
      .then((data) => setDoctors(data));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:8000/nurses`)
      .then((resp) => resp.json())
      .then((data) => setNurses(data));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:8000/patients`)
      .then((resp) => resp.json())
      .then((data) => setPatients(data));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:8000/appointments`)
      .then((resp) => resp.json())
      .then((data) => setAppointments(data));
  }, []);
  useEffect(() => {
    fetch(`http://localhost:8000/departments`)
      .then((resp) => resp.json())
      .then((data) => setDepartments(data));
  }, []);
  return (
    <div className="App">
      <Modals modal={modal} setModal={setModal} setAdmin={setAdmin} />
      <Header setModal={setModal} admin={admin} setAdmin={setAdmin} />
      <main className={`${admin === null ? "intro-main" : "logged-in__main"}`}>
        {admin === null ? null : <SideBar />}
        <Routes>
          <Route index element={<Navigate to="/intro" />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/dashboard" element={<Dashboard doctors={doctors} />} />
          <Route path="/doctors" element={<Doctors doctors={doctors} />} />
          <Route path="/nurses" element={<Nurses nurses={nurses} />} />
          <Route path="/patients" element={<Patients patients={patients} />} />
          <Route
            path="/appointments"
            element={<Appointments appointments={appointments} />}
          />
          <Route
            path="/departments"
            element={<Departments departments={departments} />}
          />
          <Route path="/payrolls" element={<Payroll />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

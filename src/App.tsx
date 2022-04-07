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
import Modals from "./Components/Modals/Modals";
import AddDoctor from "./Pages/AddDoctor";
import AddAppointment from "./Pages/AddAppointment";
import AddNurse from "./Pages/AddNurse";
import AddPatient from "./Pages/AddPatient";
import UpdateDoctor from "./Pages/UpdateDoctor";
import UpdateNurse from "./Pages/UpdateNurse";
import UpdatePatient from "./Pages/UpdatePatient";
import UpdateAppointment from "./Pages/UpdateAppointment";
import AddDepartment from "./Pages/AddDepartment";
import UpdateDepartment from "./Pages/UpdateDepartment";
import Finance from "./Pages/Finance";

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
          <Route
            path="/dashboard"
            element={
              <Dashboard
                doctors={doctors}
                nurses={nurses}
                patients={patients}
                appointments={appointments}
              />
            }
          />
          <Route
            path="/doctors"
            element={
              <Doctors
                doctors={doctors}
                //@ts-ignore
                setDoctors={setDoctors}
                setModal={setModal}
              />
            }
          />
          <Route
            path="/addDoctor"
            element={
              <AddDoctor
                departments={departments}
                doctors={doctors}
                //@ts-ignore
                setDoctors={setDoctors}
                setModal={setModal}
              />
            }
          />
          <Route
            path="/doctors/:id"
            element={
              <UpdateDoctor
                departments={departments}
                doctors={doctors}
                //@ts-ignore
                setDoctors={setDoctors}
                setModal={setModal}
              />
            }
          />
          <Route
            path="/nurses"
            element={
              <Nurses
                nurses={nurses}
                //@ts-ignore
                setNurses={setNurses}
                setModal={setModal}
              />
            }
          />
          <Route
            path="/addNurse"
            element={
              <AddNurse
                departments={departments}
                nurses={nurses}
                //@ts-ignore
                setNurses={setNurses}
                setModal={setModal}
              />
            }
          />
          <Route
            path="/nurses/:id"
            element={
              <UpdateNurse
                departments={departments}
                nurses={nurses}
                //@ts-ignore
                setNurses={setNurses}
                setModal={setModal}
              />
            }
          />
          <Route
            path="/patients"
            element={
              <Patients
                patients={patients}
                //@ts-ignore
                setPatients={setPatients}
                setModal={setModal}
              />
            }
          />
          <Route
            path="/addPatient"
            element={
              <AddPatient
                patients={patients}
                //@ts-ignore
                setPatients={setPatients}
                setModal={setModal}
              />
            }
          />
          <Route
            path="/patients/:id"
            element={
              <UpdatePatient
                departments={departments}
                patients={patients}
                //@ts-ignore
                setPatients={setPatients}
                setModal={setModal}
              />
            }
          />
          <Route
            path="/appointments"
            element={
              <Appointments
                setModal={setModal}
                appointments={appointments}
                //@ts-ignore
                setAppointments={setAppointments}
              />
            }
          />
          <Route
            path="/addAppointment"
            element={
              <AddAppointment
                appointments={appointments}
                //@ts-ignore
                setAppointments={setAppointments}
                setModal={setModal}
                doctors={doctors}
                //@ts-ignore
                setDoctors={setDoctors}
                patients={patients}
                //@ts-ignore
                setPatients={setPatients}
              />
            }
          />
          <Route
            path="/appointments/:id"
            element={
              <UpdateAppointment
                appointments={appointments}
                //@ts-ignore
                setAppointments={setAppointments}
                setModal={setModal}
              />
            }
          />
          <Route
            path="/departments"
            element={
              <Departments
                departments={departments}
                //@ts-ignore
                setDepartments={setDepartments}
                setModal={setModal}
              />
            }
          />
          <Route
            path="/addDepartment"
            element={
              <AddDepartment
                departments={departments}
                //@ts-ignore
                setDepartments={setDepartments}
                setModal={setModal}
              />
            }
          />
          <Route
            path="/departments/:id"
            element={
              <UpdateDepartment
                departments={departments}
                //@ts-ignore
                setDepartments={setDepartments}
                setModal={setModal}
              />
            }
          />
          <Route
            path="/finance"
            element={
              <Finance
                doctors={doctors}
                nurses={nurses}
                appointments={appointments}
              />
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

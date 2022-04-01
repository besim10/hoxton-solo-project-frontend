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

function App() {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [modal, setModal] = useState("");
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
  return (
    <div className="App">
      <Modals modal={modal} setModal={setModal} setAdmin={setAdmin} />
      <Header setModal={setModal} admin={admin} setAdmin={setAdmin} />
      <main className={`${admin === null ? "intro-main" : "logged-in__main"}`}>
        {admin === null ? null : <SideBar />}
        <Routes>
          <Route index element={<Navigate to="/intro" />} />
          <Route path="/intro" element={<Intro />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/nurses" element={<Nurses />} />
          <Route path="/patients" element={<Patients />} />
          <Route path="/appointments" element={<Appointments />} />
          <Route path="/departments" element={<Departments />} />
          <Route path="/payrolls" element={<Payroll />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

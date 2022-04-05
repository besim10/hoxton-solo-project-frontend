import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { Appointment } from "../App";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import TaskIcon from "@mui/icons-material/Task";
import xIcon from "./../icons/x-icon.svg";

type Props = {
  appointments: Appointment[];
  setAppointments: (value: Appointment) => void;
  setModal: (value: string) => void;
  appointment: Appointment;
};
function AppointmentListItem({
  appointments,
  appointment,
  setModal,
  setAppointments,
}: Props) {
  const [showDotsDropList, setShowDotsDropList] = useState(false);
  const [showModalForComplete, setShowModalForComplete] = useState(false);

  const updateStatus = (id: number, status: string) => {
    fetch(`http://localhost:8000/appointments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        let updatedAppointments = [...appointments];
        let matched = updatedAppointments.find(
          (appointment) => appointment.id === id
        );
        if (matched) {
          matched.status = data.status;
          //@ts-ignore
          setAppointments(updatedAppointments);
        }
      });
  };
  const updateCompleteOnServer = (data: any) => {
    fetch(`http://localhost:8000/appointments/${appointment.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((resp) => resp.json())
      .then((obj) => {
        let updatedAppointments = [...appointments];
        let matched = updatedAppointments.find(
          (singleAppointment) => singleAppointment.id === appointment.id
        );
        if (matched) {
          matched.status = "Completed";
          matched.treatment = data.treatment;
          matched.payment = data.payment;
          //@ts-ignore
          setAppointments(updatedAppointments);
          setShowModalForComplete(false);
          setModal("success-update-record");
        }
      });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      treatment: e.target.treatment.value,
      payment: Number(e.target.payment.value),
    };
    updateCompleteOnServer(data);
  };
  function deleteAppointmentFromServer(id: number) {
    fetch(`http://localhost:8000/appointments/${id}`, {
      method: "DELETE",
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          let updatedAppointments = [...appointments];
          updatedAppointments = updatedAppointments.filter(
            (appointment) => appointment.id !== id
          );
          //@ts-ignore
          setAppointments(updatedAppointments);
          setModal("success-delete-record");
        }
      });
  }
  return (
    <>
      {showModalForComplete ? (
        <div
          onClick={() => {
            setShowModalForComplete(false);
          }}
          className="modal-wrapper complete-modal-wrapper"
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="modal-container"
          >
            <header className="modal-header">
              <img onClick={() => setShowModalForComplete(false)} src={xIcon} />
              <TaskIcon
                className="user-icon"
                color="primary"
                sx={{ fontSize: 80 }}
                style={{
                  color: "#4cbb60",
                }}
              />
              <h3>Complete Appointment</h3>
            </header>
            <main className="modal-body">
              <form onSubmit={handleSubmit}>
                <label>
                  Treatment:
                  <textarea
                    name="treatment"
                    cols={30}
                    rows={10}
                    required
                  ></textarea>
                </label>
                <label>
                  Payment:
                  <input type="text" name="payment" required />
                </label>
                <button type="submit">Submit</button>
              </form>
            </main>
          </div>
        </div>
      ) : null}

      <tr className="doctor_table-item">
        <td>{appointment.id}</td>
        <td>{appointment.patient.id}</td>
        <td>{appointment.patient.fullName}</td>
        <td>{appointment.doctor.id}</td>
        <td>{appointment.doctor.fullName}</td>
        <td>{appointment.dateAndTime}</td>
        <td className={`${appointment.status}`}>{appointment.status}</td>
        {appointment.treatment === null ? (
          <td>Not treated</td>
        ) : (
          <td>{appointment.treatment}</td>
        )}
        {appointment.payment === null ? (
          <td>Null</td>
        ) : (
          <td>{appointment.payment.toFixed(2)} €</td>
        )}
        <td>
          <IconButton
            aria-label="dots"
            className={"dots-button"}
            onClick={() => {
              setShowDotsDropList(!showDotsDropList);
            }}
          >
            <MoreVertIcon />
            {showDotsDropList ? (
              <ul className="dots-dropdown__list">
                {appointment.status === "Completed" ||
                appointment.status === "Canceled" ? (
                  <>
                    <li className="dots-dropdown__list-item">
                      <EditIcon />
                      Edit
                    </li>
                    <li
                      className="dots-dropdown__list-item"
                      onClick={() => {
                        deleteAppointmentFromServer(appointment.id);
                      }}
                    >
                      <DeleteIcon />
                      Delete
                    </li>
                  </>
                ) : (
                  <>
                    <li
                      className="dots-dropdown__list-item"
                      onClick={() => {
                        updateStatus(appointment.id, "Canceled");
                      }}
                    >
                      <CancelIcon />
                      Cancel
                    </li>
                    <li
                      className="dots-dropdown__list-item"
                      onClick={() => {
                        setShowModalForComplete(true);
                        // updateStatus(appointment.id, "Completed");
                      }}
                    >
                      <CheckCircleIcon />
                      Complete
                    </li>
                    <li className="dots-dropdown__list-item">
                      <EditIcon />
                      Edit
                    </li>
                    <li
                      className="dots-dropdown__list-item"
                      onClick={() => {
                        deleteAppointmentFromServer(appointment.id);
                      }}
                    >
                      <DeleteIcon />
                      Delete
                    </li>
                  </>
                )}
              </ul>
            ) : null}
          </IconButton>
        </td>
      </tr>
    </>
  );
}
export default AppointmentListItem;

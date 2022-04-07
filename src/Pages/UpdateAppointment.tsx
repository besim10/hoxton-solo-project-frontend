import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Appointment, Doctor } from "../App";

type Props = {
  appointments: Appointment[];
  setAppointments: (value: Appointment) => void;
  setModal: (value: string) => void;
};
function UpdateAppointment({ appointments, setAppointments, setModal }: Props) {
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const navigate = useNavigate();
  const param = useParams();
  useEffect(() => {
    fetch(`http://localhost:8000/appointments/${param.id}`)
      .then((resp) => resp.json())
      .then((data) => setAppointment(data));
  }, []);

  const updateAppointmentToServer = (data: any) => {
    fetch(`http://localhost:8000/appointments/${appointment?.id}`, {
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
          let updatedAppointments = [...appointments];

          updatedAppointments = updatedAppointments.map((el) =>
            el.id === appointment?.id ? data : el
          );
          //@ts-ignore
          setAppointments(updatedAppointments);
          setModal("success-update-record");
          navigate("/appointments");
        }
      });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();

    const data = {
      treatment: e.target.treatment.value,
      payment: Number(e.target.payment.value),
    };
    updateAppointmentToServer(data);
  };
  if (appointment === null) return <h1>Loading...</h1>;
  return (
    <main className="info-main form-main">
      <h3>Update Appointment</h3>
      <form onSubmit={handleSubmit} className="general-form">
        <div className="general-form_firstSection">
          <label>
            Treatment:
            <textarea
              defaultValue={appointment.treatment}
              name="treatment"
              cols={30}
              rows={10}
              required
            ></textarea>
          </label>
          <label>
            Payment:
            <input
              type="text"
              name="payment"
              required
              defaultValue={appointment.payment}
            />
          </label>
          <button type="submit">Update</button>
        </div>
      </form>
    </main>
  );
}
export default UpdateAppointment;

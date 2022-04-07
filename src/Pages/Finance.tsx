import { Appointment, Doctor, Nurse } from "../App";

type Props = {
  appointments: Appointment[];
  doctors: Doctor[];
  nurses: Nurse[];
};
function Finance({ appointments, doctors, nurses }: Props) {
  const getTotalSalaryForDoctors = () => {
    let total = 0;
    for (const doctor of doctors) {
      total += doctor.salary;
    }
    return total;
  };
  const getTotalSalaryForNurses = () => {
    let total = 0;
    for (const nurse of nurses) {
      total += nurse.salary;
    }
    return total;
  };
  const getTotalIncomeFromAppointments = () => {
    let total = 0;
    for (const appointment of appointments) {
      if (appointment.payment !== null) {
        total += appointment.payment;
      }
    }
    return total;
  };
  return (
    <main className="info-main">
      <h2>Finance</h2>
      <div className="finance-container">
        <ul className="finance-table">
          <h3 className="outcome-title">Outcome</h3>
          <li className="finance-table__item">
            Doctors salary: <span>{getTotalSalaryForDoctors()} €</span>
          </li>
          <li className="finance-table__item">
            Nurses salary: <span>{getTotalSalaryForNurses()} €</span>
          </li>
          <li className="finance-table__item">
            Total:
            <span>
              {getTotalSalaryForDoctors() + getTotalSalaryForNurses()} €
            </span>
          </li>
        </ul>
        <ul className="finance-table">
          <h3 className="income-title">Income</h3>
          {appointments.map((appointment) =>
            appointment.payment !== null ? (
              <li className="finance-table__item">
                Appointment ID {appointment.id}:
                <span>{appointment.payment} €</span>
              </li>
            ) : null
          )}
          <div className="income-total__item">
            Total:
            <span className="total-span">
              {getTotalIncomeFromAppointments()} €
            </span>
          </div>
        </ul>
      </div>
    </main>
  );
}
export default Finance;

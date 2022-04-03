import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Nurse } from "../App";

type Props = {
  nurses: Nurse[];
};
function Nurses({ nurses }: Props) {
  return (
    <main className="info-main doctors-main">
      <div className="info-main__header">
        <h2>Nurses</h2>
        <Button size="medium" variant="contained" startIcon={<AddIcon />}>
          Add Nurse
        </Button>
      </div>
      <section className="info-main__search">
        <input type="search" name="search" placeholder="Search by Full Name" />
        <Button size="large" variant="outlined">
          <PersonSearchIcon sx={{ fontSize: 30 }} />
        </Button>
      </section>
      <table className="doctors-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>ID</th>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>Address</th>
            <th>Salary</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {nurses.map((nurse, index) => (
            <tr className="doctor_table-item" key={index}>
              <td className="image-wrapper">
                <img src={nurse.avatar} alt="" />
              </td>
              <td>{nurse.id}</td>
              <td>{nurse.fullName}</td>
              <td>{nurse.phoneNumber}</td>
              <td>{nurse.address}</td>
              <td>{nurse.salary.toFixed(3)} €</td>
              <td>{nurse.department.name}</td>
              <td>
                <IconButton aria-label="dots" className={"dots-button"}>
                  <MoreVertIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
export default Nurses;

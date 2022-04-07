import { Button, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { Nurse } from "../App";
import { useNavigate } from "react-router-dom";
import NurseListItem from "../Components/NurseListItem";
import { useState } from "react";

type Props = {
  nurses: Nurse[];
  setNurses: (value: Nurse) => void;
  setModal: (value: string) => void;
};
function Nurses({ nurses, setNurses, setModal }: Props) {
  const [search, setSearch] = useState("");
  const nursesToShow = () => {
    return nurses.filter((nurse) =>
      nurse.fullName.toUpperCase().includes(search.toUpperCase())
    );
  };
  const navigate = useNavigate();
  return (
    <main className="info-main doctors-main">
      <div className="info-main__header">
        <h2>Nurses</h2>
        <Button
          size="medium"
          variant="contained"
          onClick={() => {
            navigate("/addNurse");
          }}
          startIcon={<AddIcon />}
        >
          Add Nurse
        </Button>
      </div>
      <section className="info-main__search">
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          type="search"
          name="search"
          placeholder="Search by Full Name"
        />
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
          {nursesToShow().map((nurse, index) => (
            <NurseListItem
              nurse={nurse}
              key={index}
              nurses={nurses}
              setModal={setModal}
              setNurses={setNurses}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}
export default Nurses;

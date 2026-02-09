import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Display() {
  const [students, setStudents] = useState([]);

  const displayData = async () => {
    const res = await axios.get("http://localhost:5000/students");
    setStudents(res.data);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Student List</h2>

      <div style={styles.buttonGroup}>
        <button onClick={displayData} style={styles.btn}>
          Display
        </button>

        <Link to="/">
          <button style={styles.homeBtn}>Home</button>
        </Link>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.roll_no}>
              <td>{s.roll_no}</td>
              <td>{s.name}</td>
              <td>{s.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "40px",
  },
  heading: {
    marginBottom: "20px",
  },
  buttonGroup: {
    marginBottom: "20px",
  },
  btn: {
    padding: "8px 16px",
    marginRight: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  homeBtn: {
    padding: "8px 16px",
    backgroundColor: "#2196F3",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  table: {
    margin: "0 auto",
    borderCollapse: "collapse",
    width: "60%",
  },
};

export default Display;

import { useState } from "react";
import { Link } from "react-router-dom";

function Update() {
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  const handleUpdate = async () => {
    if (!rollNo || !name || !department) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/students/update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            roll_no: rollNo,
            name: name,
            department: department,
          }),
        }
      );

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
      alert("Error updating student");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2>Update Student</h2>

        <label style={styles.label}>Roll Number (WHERE)</label>
        <input
          type="number"
          placeholder="Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>New Name (SET)</label>
        <input
          type="text"
          placeholder="New Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <label style={styles.label}>New Department (SET)</label>
        <input
          type="text"
          placeholder="New Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleUpdate} style={styles.button}>
          Update
        </button>

        <Link to="/" style={styles.link}>
          Go to Home
        </Link>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f2f2f2",
  },
  card: {
    background: "#fff",
    padding: "30px",
    width: "350px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    fontSize: "15px",
  },
  button: {
    marginTop: "15px",
    padding: "10px",
    fontSize: "16px",
    background: "#000000",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  link: {
    marginTop: "10px",
    textAlign: "center",
    textDecoration: "none",
    color: "#000000",
  },
};

export default Update;

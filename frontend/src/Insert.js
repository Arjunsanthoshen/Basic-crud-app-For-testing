import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Insert() {
  const [roll_no, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/students", {
        roll_no,
        name,
        department,
      });

      alert("Student inserted successfully!");

      setRollNo("");
      setName("");
      setDepartment("");
    } catch (error) {
      console.error("Error inserting student:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Insert Student</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Roll No"
          value={roll_no}
          onChange={(e) => setRollNo(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Insert
        </button>
      </form>

      <br />

      <Link to="/" style={styles.link}>
        <button style={styles.homeButton}>Go to Home</button>
      </Link>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6f8",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    width: "300px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    cursor: "pointer",
    borderRadius: "6px",
  },
  homeButton: {
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "6px",
  },
  link: {
    textDecoration: "none",
  },
};

export default Insert;

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Insert from "./Insert";
import Select from "./Select";
import Update from "./Update";
import Delete from "./Delete";

function Home() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Student CRUD App</h1>

      <div style={styles.buttonContainer}>
        <Link to="/insert" style={styles.link}>
          <button style={styles.button}>Insert</button>
        </Link>

        <Link to="/select" style={styles.link}>
          <button style={styles.button}>Select</button>
        </Link>

        <Link to="/update" style={styles.link}>
          <button style={styles.button}>Update</button>
        </Link>

        <Link to="/delete" style={styles.link}>
          <button style={styles.button}>Delete</button>
        </Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/insert" element={<Insert />} />
        <Route path="/select" element={<Select />} />
        <Route path="/update" element={<Update />} />
        <Route path="/delete" element={<Delete />} />
      </Routes>
    </Router>
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
    fontSize: "48px",
    marginBottom: "40px",
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    gap: "25px",
  },
  button: {
    padding: "15px 30px",
    fontSize: "18px",
    cursor: "pointer",
    borderRadius: "8px",
  },
  link: {
    textDecoration: "none",
  },
};

export default App;

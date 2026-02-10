const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// -------------------- MIDDLEWARE --------------------
app.use(cors());
app.use(express.json());

// -------------------- DATABASE (POOL) --------------------
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "tree",
  database: "college",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test DB connection
db.getConnection((err, connection) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MariaDB (pool)!");
    connection.release();
  }
});

// -------------------- TEST ROUTE --------------------
app.get("/test", (req, res) => {
  res.send("Backend is running");
});

// -------------------- CREATE (INSERT) --------------------
app.post("/students", (req, res) => {
  const { roll_no, name, department } = req.body;

  if (!roll_no || !name || !department) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql =
    "INSERT INTO students (roll_no, name, department) VALUES (?, ?, ?)";

  db.query(sql, [roll_no, name, department], (err) => {
    if (err) {
      console.log("Insert Error:", err);
      return res.status(500).json({ message: "Insert failed" });
    }

    res.json({ message: "Student inserted successfully" });
  });
});

// -------------------- READ (DISPLAY ALL) --------------------
app.get("/students", (req, res) => {
  const sql = "SELECT * FROM students";

  db.query(sql, (err, result) => {
    if (err) {
      console.log("Fetch Error:", err);
      return res.status(500).json({ message: "Failed to fetch students" });
    }

    res.json(result);
  });
});

// -------------------- UPDATE --------------------
app.put("/students/update", (req, res) => {
  console.log("UPDATE API HIT");
  console.log("BODY:", req.body);

  const { roll_no, name, department } = req.body;

  if (!roll_no || !name || !department) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = `
    UPDATE students
    SET name = ?, department = ?
    WHERE roll_no = ?
  `;

  db.query(sql, [name, department, roll_no], (err, result) => {
    if (err) {
      console.log("Update Error:", err);
      return res.status(500).json({ message: "Update failed" });
    }

    console.log("Affected rows:", result.affectedRows);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No student found with that roll number" });
    }

    res.json({ message: "Student updated successfully" });
  });
});

// -------------------- DELETE --------------------
app.post("/delete", (req, res) => {
  const { roll_no } = req.body;

  if (!roll_no) {
    return res.status(400).json({ message: "Roll number is required" });
  }

  db.query(
    "SELECT * FROM students WHERE roll_no = ?",
    [roll_no],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.status(404).json({ message: "Student not found" });
      }

      const deletedRecord = result[0];

      db.query(
        "DELETE FROM students WHERE roll_no = ?",
        [roll_no],
        (err) => {
          if (err) return res.status(500).json(err);

          res.json(deletedRecord);
        }
      );
    }
  );
});

// -------------------- SERVER --------------------
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

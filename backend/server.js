const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");

const app = express();

// 🔵 Middleware (MUST be before routes)
app.use(cors());
app.use(express.json());

// 🔵 Database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tree",
  database: "college",
});

// 🔵 Connect to DB
db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MariaDB!");
  }
});

// 🔵 Test route
app.get("/test", (req, res) => {
  res.send("Backend is running");
});

// 🔵 INSERT student
app.post("/students", (req, res) => {
  const { roll_no, name, department } = req.body;

  const sql =
    "INSERT INTO students (roll_no, name, department) VALUES (?, ?, ?)";

  db.query(sql, [roll_no, name, department], (err) => {
    if (err) {
      console.log("Insert Error:", err);
      res.status(500).json({ message: "Insert failed" });
    } else {
      res.json({ message: "Student inserted successfully" });
    }
  });
});

// 🔵 UPDATE student (FINAL + DEBUG)
app.put("/students/update", (req, res) => {
  console.log("UPDATE API HIT");
  console.log("BODY:", req.body);

  const { roll_no, name, department } = req.body;

  const sql = `
    UPDATE students
    SET name = ?, department = ?
    WHERE roll_no = ?
  `;

  db.query(sql, [name, department, roll_no], (err, result) => {
    if (err) {
      console.log("Update Error:", err);
      res.status(500).json({ message: "Update failed" });
    } else {
      console.log("Affected rows:", result.affectedRows);

      if (result.affectedRows === 0) {
        res.json({ message: "No student found with that roll number" });
      } else {
        res.json({ message: "Student updated successfully" });
      }
    }
  });
});

// 🔵 Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

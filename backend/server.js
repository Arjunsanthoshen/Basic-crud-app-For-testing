const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🟣 Create DB connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "tree",
  database: "college"
});

// 🟣 Connect to DB
db.connect((err) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Connected to MariaDB!");
  }
});

// 🟣 Test route
app.get("/test", (req, res) => {
  db.query("SELECT 1", (err, result) => {
    if (err) {
      res.send("DB Error");
    } else {
      res.send("DB Connected Successfully!");
    }
  });
});

// 🟣 CREATE – Insert student
app.post("/students", (req, res) => {
  const { roll_no, name, department } = req.body;

  const sql =
    "INSERT INTO students (roll_no, name, department) VALUES (?, ?, ?)";

  db.query(sql, [roll_no, name, department], (err, result) => {
    if (err) {
      console.log("Insert Error:", err);
      res.status(500).json({ message: "Database Insert Failed" });
    } else {
      res.json({ message: "Student inserted successfully" });
    }
  });
});
app.post("/delete", (req, res) => {
  const { roll_no } = req.body;


  db.query(
    "SELECT * FROM students WHERE roll_no = ?", 
    [roll_no],
    (err, result) => {
      if (err) return res.status(500).send(err);

      if (result.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      const deletedRecord = result[0];

      db.query(
        "DELETE FROM students WHERE roll_no = ?",
        [roll_no],
        (err) => {
          if (err) return res.status(500).send(err);

          res.json(deletedRecord);
        }
      );
    }
  );
});
// 🟢 READ – Display all students  ⭐ NEW
app.get("/students", (req, res) => {
  const sql = "SELECT * FROM students";

  db.query(sql, (err, result) => {
    if (err) {
      console.log("Fetch Error:", err);
      res.status(500).json({ message: "Failed to fetch students" });
    } else {
      res.json(result);
    }
  });

});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});

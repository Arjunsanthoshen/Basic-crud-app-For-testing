import { Link } from "react-router-dom";
import "./Delete.css";
import { useState } from "react";
import axios from "axios";  
function Delete() {
  const [form, setForm] = useState({
    roll_no: "",
    name: "",
    department: ""
  });

  const [deletedData, setDeletedData] = useState(null); 

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function handleSubmit(e) {     
    e.preventDefault();

    const confirmData = window.confirm("Are you sure you want to delete?");
    if (!confirmData) return;

    try {
      const response = await axios.post(
        "http://localhost:5000/delete", 
        { roll_no: form.roll_no }
      );

      setDeletedData(response.data);  
      alert("Data deleted successfully");

    } catch (error) {
      alert("Error deleting data");
      console.error(error);
    }
  }

  return (
    <div className="delete">
      <h2>Delete</h2>

      <form className="delete-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="roll_no"
          value={form.roll_no}
          placeholder="roll_no"
          onChange={handleChange}
        />

        <button type="submit">Delete</button>
      </form>

      {deletedData && (
        <div className="deleted-info">
          <h3>Deleted Record</h3>
          <p>Username: {deletedData.roll_no}</p>
          <p>Name: {deletedData.name}</p>
          <p>Department: {deletedData.department}</p>
        </div>
      )}
      <Link to="/" className="link">
              <button className="homeButton">Go to Home</button>
            </Link>
    </div>
    
  );
}

export default Delete;

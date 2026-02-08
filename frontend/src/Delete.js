import { Link } from "react-router-dom";

function Delete() {
  return (
    <div>
      <h2>Delete Page</h2>

      <br />

      <Link to="/">
        <button>Go to Home</button>
      </Link>
    </div>
  );
}

export default Delete;

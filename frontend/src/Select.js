import { Link } from "react-router-dom";

function Select() {
  return (
    <div>
      <h2>Select Page</h2>

      <br />

      <Link to="/">
        <button>Go to Home</button>
      </Link>
    </div>
  );
}

export default Select;

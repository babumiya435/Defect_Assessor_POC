import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
      <Link to="/dashboard" style={{ margin: '10px' }}>Dashboard</Link>
      {/* <Link to="/about" style={{ margin: '10px' }}>About</Link>
      <Link to="/contact" style={{ margin: '10px' }}>Contact</Link> */}
    </nav>
  );
}

export default Navbar;

import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav>
        <ul className="listOne">
          <li >
            <Link to="/">Landing Page</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
      <Outlet/>
    </>
  );
}
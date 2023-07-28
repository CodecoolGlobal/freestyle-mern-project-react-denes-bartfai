import { Link, Outlet } from "react-router-dom";

export default function Navbar(props) {
  const loggedIn = props.login;
  return (
    <>
      <nav>
        <button>
          <Link to="/">Home</Link>
        </button>
        {loggedIn ? (
          <>
          <button>
            <Link to="/profile">Profile</Link>
          </button>
          <button>
          <Link to="/leaderboard">Leaderboard</Link>
        </button>
        </>
        ) : (
          <button>
            <Link to="/login">Login</Link>
          </button>
        )}
      </nav>
      <Outlet />
    </>
  );
}

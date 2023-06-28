import { Link } from "react-router-dom";

function LandingPage(props) {
  const loggedIn = props.login;
  return (
    <>
      {loggedIn ? (
        <button>
          <Link to="/play">Play</Link>
        </button>
      ) : (
        <div>
          <h1>Please login to proceed</h1>
        </div>
      )}
    </>
  );
}

export default LandingPage;

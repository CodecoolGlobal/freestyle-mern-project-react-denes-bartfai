import { Link } from "react-router-dom";

function LandingPage(props) {
  const loggedIn = props.login;
  return (
    <>
      {loggedIn ? (
        <button className="playButton">
          <Link to="/play">Click here to play</Link>
        </button>
      ) : (
        <div className="proceed">
          <h3>Welcome to our quiz site</h3>
          <h3>Please login to proceed</h3>
        </div>
      )}
    </>
  );
}

export default LandingPage;

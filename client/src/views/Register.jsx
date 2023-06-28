import { Link } from "react-router-dom";

export default function Register() {
  return (
    <>
      <div>Register</div>
      <form>
        <input type="text" placeholder="username"></input>
        <input type="text" placeholder="password"></input>
        <input type="text" placeholder="confirm password"></input>
        <button type="submit">Register</button>
      </form>
      <p>Already have an account?</p>
      <p>
        <Link to="/login">Click here</Link>
      </p>
    </>
  );
}

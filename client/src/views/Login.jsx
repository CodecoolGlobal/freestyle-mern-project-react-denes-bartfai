import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div>Login</div>
      <form>
        <input type="text" placeholder="username"></input>
        <input type="text" placeholder="password"></input>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account yet?</p>
      <p>
        <Link to="/register">Click here</Link>
      </p>
    </>
  );
}

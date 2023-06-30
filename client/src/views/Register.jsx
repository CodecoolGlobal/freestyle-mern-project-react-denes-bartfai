import { useNavigate , Link } from "react-router-dom";
import React, { useState } from "react";

export default function Register(props) {
  const userSetter = props.userSet;
  const navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirm] = useState();

  const handleSubmit = function (e) {
    e.preventDefault();
    if (confirmPassword === password) {
      fetch(`http://127.0.0.1:3001/api/findUser/${username}`)
        .then((response) => response.json())
        .then((data) => {
          if (!data[0]) {
            userSetter({ username: username, password: password });
            fetch("http://127.0.0.1:3001/api/user", {
              method: "POST",
              body: JSON.stringify({
                username: username,
                password: password
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(err => console.log(err))
          }
        })
        .catch(err => console.log(err));
        navigate("/");
    }
  }

  return (
    <>
      <div>Register</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <input
          type="password"
          placeholder="confirm password"
          onChange={(e) => {
            setConfirm(e.target.value);
          }}
        ></input>
        <button type="submit">
          Register
        </button>
      </form>
      <p>Already have an account?</p>
      <p>
        <Link to="/login">Click here</Link>
      </p>
    </>
  );
}

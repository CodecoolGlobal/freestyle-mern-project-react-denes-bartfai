import { Link } from "react-router-dom";
import React, { useState } from "react";

export default function Register(props) {
  const userSetter = props.userSet;

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirm] = useState();

  function handleSubmit() {
    if (confirmPassword === password) {
      fetch(`localhost:3001/api/findUser/${userData.username}`)
        .then((response) => response.json())
        .then((response) => {
          if (!response[0]) {
            userSetter({ username: username, password: password });
            fetch("localhost:3001/api/user", {
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
            .then(response);
          }
        });
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
          type="text"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="confirm password"
          onChange={(e) => {
            setConfirm(e.target.value);
          }}
        ></input>
        <button type="submit">
          <Link to="/">Register</Link>
        </button>
      </form>
      <p>Already have an account?</p>
      <p>
        <Link to="/login">Click here</Link>
      </p>
    </>
  );
}

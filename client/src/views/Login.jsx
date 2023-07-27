import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

export default function Login(props) {
  const userSetter = props.userSet;
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  /*const handleSubmit = function (e) {
    e.preventDefault();
    fetch(`http://127.0.0.1:3001/api/findUser/${username}`)
    .then(response => response.json())
    .then(data => {
      if(data[0] && data[1].password === password){
        userSetter({username: username, password: password, id: data[1]["_id"]})
        navigate("/");
      }
    })
  };*/

  const handleSubmit = function (e) {
    e.preventDefault();
    const requestData = {
      username: username,
      password: password,
    };
    fetch("http://127.0.0.1:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
    .then((response) => response.json())
    .then(data => {
       console.log(data)
       userSetter(username, password)
       navigate("/");
    })
    .catch((error) => {
    console.error("Error occurred during login:", error);
    });
  };

  return (
    <>
      <div className="login">Login</div>
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
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account yet?</p>
      <p>
        <Link to="/register">Click here</Link>
      </p>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile(props) {
  const username = props.user;
  const login = props.login;
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [deleting, setDelete] = useState(false);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:3001/api/deleteUser/${id}`, {
      method: "DELETE",
    }).then((res) => {
      navigate("/login");
      login(false);
    });
  };

  useEffect(() => {
    console.log(username);
    fetch(`http://127.0.0.1:3001/api/findUser/${username}`)
      .then((res) => res.json())
      .then((response) => {
        if (response[0]) {
          setUser(response[1]);
          setLoading(false);
        }
      });
  }, []);

  return (
    <>
      {loading ? (
        <p>Loading please wait</p>
      ) : (
        <>
          {deleting ? (
            <div>
              <button
                onClick={() => {
                  setDelete(false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleDelete(user._id);
                }}
              >
                Delete
              </button>
            </div>
          ) : (
            <div>
              <h1>Name: {user.username}</h1>
              <h2>HighScore: This function is not yet available</h2>
              <button
                onClick={() => {
                  setDelete(true);
                }}
              >
                Delete Profile
              </button>
            </div>
          )}
        </>
      )}
    </>
  );
}

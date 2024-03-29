import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./views/Register";
import LandingPage from "./views/LandingPage";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Play from "./views/Play";
import Leaderboard from "./views/Leaderboard";

function App() {
  const [loggedIn, setLogin] = useState(false);
  const [userData, setUserData] = useState({username: "test", password: "test"});

  const userSetter = function (name, password) {
    setLogin(true);
    setUserData({ username: name, password: password});
  };
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar login={loggedIn} />}>
          <Route path="/" element={<LandingPage login={loggedIn} />} />
          <Route path="/register" element={<Register userSet={userSetter} />} />
          <Route path="/login" element={<Login userSet={userSetter} />} />
          <Route path="/profile" element={<Profile user={userData.username} login={setLogin} />} />
          <Route path="/play" element={<Play user={userData} />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

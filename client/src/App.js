import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./views/Register";
import LandingPage from "./views/LandingPage";
import Login from "./views/Login";
import Profile from "./views/Profile";
import Play from "./views/Play";

function App() {
  const [loggedIn, setLogin] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navbar login={loggedIn} />}>
          <Route path="/" element={<LandingPage login={loggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/play" element={<Play />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

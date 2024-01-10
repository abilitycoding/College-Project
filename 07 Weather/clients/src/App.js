import React from "react";
import Home from "./Components/Home";
import Alert from "./Components/Alert";
import { Routes, Route } from "react-router-dom";
import WeatherNavbar from "./Components/Navbar";

const App = () => {
  return (
    <div>
      <WeatherNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alert" element={<Alert />} />
      </Routes>
    </div>
  );
};

export default App;

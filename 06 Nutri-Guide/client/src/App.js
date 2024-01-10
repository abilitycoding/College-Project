import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import BMI from "./Components/BMI";
import NutriGuideNavbar from "./Components/NutriGuideNavbar";
import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
    <NutriGuideNavbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/bmi" element={<BMI />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

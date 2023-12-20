import React from "react";
import "./app.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Footer from "./Components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import AuthTheme from "./Pages/Auth/AuthTheme";
import Profile from "./Pages/Auth/Profile";
import Register from "./Pages/Auth/Register";


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthTheme />}>
          <Route path="sign-in" element={<Login />} />
          <Route path="sign-up" element={<Register />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>

      <Footer />
    </>
  );
};

export default App;

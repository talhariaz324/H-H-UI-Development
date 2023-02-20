/* eslint-disable prettier/prettier */
import React from "react";
import "./App.css";
import {
  Routes,
  Route
} from "react-router-dom";
import Contact from "./components/contact";
import Footer from "./components/footer";
// import Header from "./components/header";
import ContactUS from "./pages/Contact";

import Programs from "./pages/Programs";
import About from "./pages/about";
import Home from "./pages/home";
import Navbar from "./components/navbar/navbar";


function App() {
  return (
    <>
      {/* <Header /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUS />} />
        <Route path="/programs" element={<Programs />} />
      </Routes>
      {/* <Header /> */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUS />} />
        <Route path="/programs" element={<Programs />} />
      </Routes>

      <Contact />
      <Footer />

    </>

  );
}

export default App;

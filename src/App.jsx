import React from "react";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Acknowledgements from "./components/Acknowledgements/Acknowledgements";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <hr className="custom-hr" />

      <Projects />
      <hr className="custom-hr" />
      <Acknowledgements />
      <Contact />
      <hr className="footer-hr" />
      <Footer />
    </div>
  );
};

export default App;

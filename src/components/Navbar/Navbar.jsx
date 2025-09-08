import React from "react";
import "./Navbar.css";
import logo from "../../assets/logoj.svg";

const Navbar = () => {
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div id="home" className="navbar">
      <a href="#home" onClick={(e) => scrollToSection(e, "home")}>
        <img src={logo} alt="Logo" className="logo" />
      </a>

      <ul className="nav-menu">
        <a href="#home" onClick={(e) => scrollToSection(e, "home")}>
          <li className="nav-item">Home</li>
        </a>
        <a href="#about" onClick={(e) => scrollToSection(e, "about")}>
          <li className="nav-item">About</li>
        </a>
        <a href="#projects" onClick={(e) => scrollToSection(e, "projects")}>
          <li className="nav-item">Projects</li>
        </a>
        <a href="#acks" onClick={(e) => scrollToSection(e, "acks")}>
          <li className="nav-item">Acknowledgements</li>
        </a>
        <a href="#contact" onClick={(e) => scrollToSection(e, "contact")}>
          <li className="nav-item">Contact</li>
        </a>
      </ul>

      <div
        className="nav-connect"
        onClick={(e) => scrollToSection(e, "contact")}
      >
        Get in touch
      </div>
    </div>
  );
};

export default Navbar;

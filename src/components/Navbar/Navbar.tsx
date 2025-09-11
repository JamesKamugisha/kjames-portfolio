import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logoj.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false); // close menu after click
    }
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <a href="#home" onClick={(e) => scrollToSection(e, "home")}>
        <img src={logo} alt="Logo" className="logo" />
      </a>

      {/* Hamburger Toggle */}
      <button
        className={`hamburger-toggle ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle navigation menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Menu */}
      <ul className={`nav-menu ${isOpen ? "show" : ""}`}>
        <li onClick={(e) => scrollToSection(e as any, "home")}>Home</li>
        <li onClick={(e) => scrollToSection(e as any, "about")}>About</li>
        <li onClick={(e) => scrollToSection(e as any, "projects")}>Projects</li>
        <li onClick={(e) => scrollToSection(e as any, "acks")}>Acknowledgements</li>
        <li onClick={(e) => scrollToSection(e as any, "contact")}>Contact</li>
        <li>
          <button
            className="nav-connect"
            onClick={(e) => scrollToSection(e as any, "contact")}
          >
            Get in touch
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

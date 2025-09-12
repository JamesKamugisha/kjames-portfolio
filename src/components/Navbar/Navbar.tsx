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

      {/* Desktop Navigation */}
      <div className="desktop-nav">
        <ul className="nav-menu-list">
          <li className="clickable" onClick={(e) => scrollToSection(e as any, "home")}>Home</li>
          <li className="clickable" onClick={(e) => scrollToSection(e as any, "about")}>About</li>
          <li className="clickable" onClick={(e) => scrollToSection(e as any, "projects")}>Projects</li>
          <li className="clickable" onClick={(e) => scrollToSection(e as any, "acks")}>Acknowledgements</li>
          <li className="clickable" onClick={(e) => scrollToSection(e as any, "contact")}>Contact</li>
        </ul>
        
        <button
          className="nav-connect"
          onClick={(e) => scrollToSection(e as any, "contact")}
        >
          Get in touch
        </button>
      </div>

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

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? "show" : ""}`}>
        {/* Close Button */}
        <button 
          className="close-menu-btn"
          onClick={() => setIsOpen(false)}
          aria-label="Close menu"
        >
          <span></span>
          <span></span>
        </button>
        
        <ul className="mobile-nav-list">
          <li className="clickable" onClick={(e) => scrollToSection(e as any, "home")}>Home</li>
          <li className="clickable" onClick={(e) => scrollToSection(e as any, "about")}>About</li>
          <li className="clickable" onClick={(e) => scrollToSection(e as any, "projects")}>Projects</li>
          <li className="clickable" onClick={(e) => scrollToSection(e as any, "acks")}>Acknowledgements</li>
          <li className="clickable" onClick={(e) => scrollToSection(e as any, "contact")}>Contact</li>
          <li>
            <button
              className="mobile-nav-connect"
              onClick={(e) => scrollToSection(e as any, "contact")}
            >
              Get in touch
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

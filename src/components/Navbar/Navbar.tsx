import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logoj.svg";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false); // Close mobile menu after navigation
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const section = document.getElementById(id);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
        setIsMenuOpen(false);
      }
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'acks', label: 'Acknowledgements' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="navbar">
      {/* Logo */}
      <a 
        href="#home" 
        onClick={(e) => scrollToSection(e, "home")}
        className="logo-link"
        aria-label="Go to top of page"
      >
        <img src={logo} alt="James Kamugisha Logo" className="logo" />
      </a>

      {/* Desktop Navigation */}
      <div className="desktop-nav">
        <ul className="nav-menu">
          {navItems.map((item) => (
            <li key={item.id} className="nav-item">
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
                tabIndex={0}
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-right">
          <ThemeToggle />
          <button
            className="nav-connect"
            onClick={(e) => scrollToSection(e as any, "contact")}
            onKeyDown={(e) => handleKeyDown(e, "contact")}
            aria-label="Get in touch - navigate to contact section"
          >
            Get in touch
          </button>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className={`mobile-menu-toggle ${isMenuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        {...(isMenuOpen ? { 'aria-expanded': 'true' } : { 'aria-expanded': 'false' })}
        aria-label="Toggle navigation menu"
        aria-controls="mobile-menu"
      >
        <span className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {/* Mobile Menu */}
      <div 
        className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}
        id="mobile-menu"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            closeMenu();
          }
        }}
      >
        <ul className="mobile-nav-menu">
          {navItems.map((item) => (
            <li key={item.id} className="mobile-nav-item">
              <a
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
                tabIndex={0}
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="mobile-nav-right">
          <ThemeToggle />
          <button
            className="mobile-nav-connect"
            onClick={(e) => scrollToSection(e as any, "contact")}
            onKeyDown={(e) => handleKeyDown(e, "contact")}
            aria-label="Get in touch - navigate to contact section"
          >
            Get in touch
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
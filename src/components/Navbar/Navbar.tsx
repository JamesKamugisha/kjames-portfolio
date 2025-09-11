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
    console.log('Toggle menu clicked, current state:', isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
    console.log('New state will be:', !isMenuOpen);
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
    <nav id="home" className="navbar" role="navigation" aria-label="Main navigation">
      <a 
        href="#home" 
        onClick={(e) => scrollToSection(e, "home")}
        className="logo-link"
        aria-label="Go to top of page"
      >
        <img src={logo} alt="James Kamugisha Logo" className="logo" />
      </a>

      <button
        className="mobile-menu-toggle"
        onClick={toggleMenu}
        {...(isMenuOpen ? { 'aria-expanded': 'true' } : { 'aria-expanded': 'false' })}
        aria-label="Toggle navigation menu"
        aria-controls="nav-menu"
      >
        <span className="sr-only">Menu</span>
        <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {/* Debug text */}
        <span className="debug-text">MENU {isMenuOpen ? 'OPEN' : 'CLOSED'}</span>
        <div className="debug-indicator">DEBUG</div>
      </button>

      <ul 
        className={`nav-menu ${isMenuOpen ? 'open' : ''}`} 
        id="nav-menu"
        onClick={(e) => {
          // Close menu when clicking on the backdrop (not on menu items)
          if (e.target === e.currentTarget) {
            closeMenu();
          }
        }}
      >
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
        
        {/* Mobile Get in touch button */}
        <li className="nav-item mobile-connect">
          <div
            className="nav-connect mobile-nav-connect"
            onClick={(e) => scrollToSection(e as any, "contact")}
            onKeyDown={(e) => handleKeyDown(e, "contact")}
            tabIndex={0}
            aria-label="Get in touch - navigate to contact section"
          >
            Get in touch
          </div>
        </li>
      </ul>

      <div className="nav-right">
        <ThemeToggle />
        <div
          className="nav-connect"
          onClick={(e) => scrollToSection(e as any, "contact")}
          onKeyDown={(e) => handleKeyDown(e, "contact")}
          role="button"
          tabIndex={0}
          aria-label="Get in touch - navigate to contact section"
        >
          Get in touch
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

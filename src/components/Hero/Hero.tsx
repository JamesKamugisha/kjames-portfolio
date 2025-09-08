import React from "react";
import "./Hero.css";
import heroImage from "../../assets/hero-image1.jpg";
import { usePortfolio } from "../../context/PortfolioContext";
import { useTypewriter } from "../../hooks/useTypewriter";

const Hero: React.FC = () => {
  const { state, dispatch } = usePortfolio();
  const { typed } = useTypewriter({ text: "Kamugisha" });

  const handleAvailabilityToggle = () => {
    dispatch({ type: 'TOGGLE_AVAILABILITY' });
  };

  return (
    <div id="hero" className="hero">
      <img src={heroImage} alt="James Kamugisha - Fullstack Developer" />
      <div className="hero">
        <h1>
          James{" "}
          <span className="hero-highlight">
            {typed}
            <span className="caret" aria-hidden="true">
              |
            </span>
          </span>
        </h1>

        <p>
          A Fullstack and Mobile App developer, based in the USA with a love for
          creating innovative solutions. Explore my work and let's connect!
        </p>

        <div className="hero-icons">
          <a
            href="https://www.linkedin.com/in/james-kamugisha-j1k8/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            aria-label="Connect with James on LinkedIn"
          >
            <i className="fa-brands fa-linkedin" aria-hidden="true"></i>
          </a>
          <a
            href="https://github.com/JamesKamugisha"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
            aria-label="View James's projects on GitHub"
          >
            <i className="fa-brands fa-github" aria-hidden="true"></i>
          </a>
        </div>

        <div className="hero-resume">
          <button
            className={`btn ${state.availableForWork ? "btn-available" : "btn-unavailable"}`}
            onClick={handleAvailabilityToggle}
            aria-label={`Currently ${state.availableForWork ? 'available' : 'not available'} for work. Click to toggle.`}
          >
            {state.availableForWork ? "Available for Work" : "Not Available"}
          </button>
          <button className="btn" aria-label="Download James's resume">
            Download Resume
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

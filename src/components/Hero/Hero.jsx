import React, { useState, useEffect } from "react";
import "./Hero.css";
import heroImage from "../../assets/hero-image1.jpg";
import ParticleBackground from "../ParticleBackground/ParticleBackground";

const Hero = () => {
  const [available, setAvailable] = useState(false);
  const [showResumeMessage, setShowResumeMessage] = useState(false);

  // typewriter state
  const fullText = "Kamugisha";
  const [typed, setTyped] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("availableForWork");
    if (saved !== null) setAvailable(saved === "true");
  }, []);

  // Only save to localStorage when user manually changes availability
  const handleAvailabilityToggle = () => {
    setAvailable((prev) => {
      const newValue = !prev;
      localStorage.setItem("availableForWork", String(newValue));
      return newValue;
    });
  };

  // Handle resume download click
  const handleResumeClick = () => {
    setShowResumeMessage(true);
    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowResumeMessage(false);
    }, 3000);
  };

  // typing loop
  useEffect(() => {
    const TYPING = 120; // ms per char while typing
    const DELETING = 60; // ms per char while deleting
    const HOLD_END = 900; // pause when fully typed
    const HOLD_START = 600; // pause when cleared

    let timer;

    if (!isDeleting && typed.length < fullText.length) {
      // type next char
      timer = setTimeout(
        () => setTyped(fullText.slice(0, typed.length + 1)),
        TYPING
      );
    } else if (!isDeleting && typed.length === fullText.length) {
      // reached end — hold, then start deleting
      timer = setTimeout(() => setIsDeleting(true), HOLD_END);
    } else if (isDeleting && typed.length > 0) {
      // delete char
      timer = setTimeout(
        () => setTyped(fullText.slice(0, typed.length - 1)),
        DELETING
      );
    } else if (isDeleting && typed.length === 0) {
      // cleared — hold, then start typing again
      timer = setTimeout(() => setIsDeleting(false), HOLD_START);
    }

    return () => clearTimeout(timer);
  }, [typed, isDeleting]);

  return (
    <section
      id="hero"
      className="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <ParticleBackground />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        <img src={heroImage} alt="RobotImage" />
        <div className="hero-content">
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
            A Fullstack and Mobile App developer, based in the USA in the New
            England area, with a love for creating innovative solutions. Explore
            my work and let's connect!
          </p>

          <div className="hero-icons">
            <a
              href="https://www.linkedin.com/in/james-kamugisha-j1k8/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
            <a
              href="https://github.com/JamesKamugisha"
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              <i className="fa-brands fa-github"></i>
            </a>
          </div>

          <div className="hero-resume">
            <button
              className={`btn ${
                available ? "btn-available" : "btn-unavailable"
              }`}
              onClick={handleAvailabilityToggle}
            >
              {available ? "Available for Work" : "Not Available"}
            </button>
            <div className="resume-button-container">
              <button className="btn" onClick={handleResumeClick}>
                Download Resume
              </button>
              {showResumeMessage && (
                <div className="resume-message">
                  Resume not available at the moment
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

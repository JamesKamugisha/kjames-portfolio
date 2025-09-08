import React, { useState, useEffect } from "react";
import "./Hero.css";
import heroImage from "../../assets/hero-image1.jpg";

const Hero = () => {
  const [available, setAvailable] = useState(false);

  // typewriter state
  const fullText = "Kamugisha";
  const [typed, setTyped] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("availableForWork");
    if (saved !== null) setAvailable(saved === "true");
  }, []);
  useEffect(() => {
    localStorage.setItem("availableForWork", String(available));
  }, [available]);

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
    <div id="hero" className="hero">
      <img src={heroImage} alt="RobotImage" />
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
            className={`btn ${available ? "btn-available" : "btn-unavailable"}`}
            onClick={() => setAvailable((v) => !v)}
          >
            {available ? "Available for Work" : "Not Available"}
          </button>
          <button className="btn">Download Resume</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

import React from "react";
import "./About.css";
import aboutmeImage from "../../assets/hero-image.jpg";

const About = () => {
  return (
    <div id="about" className="about">
      <div className="about-title">
        <h2>
          <span className="identity">&gt;_</span> About Me
        </h2>
      </div>
      <div className="about-section">
        <img src={aboutmeImage} alt="Profile" className="about-image" />

        <div className="about-info">
          <div className="about-intro">
            <p>
              I am a passionate developer with a love for creating innovative
              solutions. My journey in tech has been fueled by curiosity and a
              desire to learn. I enjoy working on projects that challenge me and
              allow me to grow.
            </p>
          </div>
          <div className="about-skills">
            <div className="skill-item">
              <p>HTML & CSS</p>
              <hr style={{ "--skill-width": "80%", "--delay": "0s" }} />
            </div>
            <div className="skill-item">
              <p>JavaScript</p>
              <hr style={{ "--skill-width": "70%", "--delay": "0.1s" }} />
            </div>
            <div className="skill-item">
              <p>React JS</p>
              <hr style={{ "--skill-width": "65%", "--delay": "0.2s" }} />
            </div>
            <div className="skill-item">
              <p>React Native</p>
              <hr style={{ "--skill-width": "60%", "--delay": "0.3s" }} />
            </div>
            <div className="skill-item">
              <p>Express.js</p>
              <hr style={{ "--skill-width": "50%", "--delay": "0.4s" }} />
            </div>
            <div className="skill-item">
              <p>Node.js</p>
              <hr style={{ "--skill-width": "60%", "--delay": "0.5s" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

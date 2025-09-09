import React from "react";
import "./Acknowledgements.css";
import ACKS from "../../../public/ACKS";

const Acknowledgements = () => {
  return (
    <div className="acknowledgements">
      <div className="acknowledgements-intro">
        <h2>
          <span className="identity">&gt;_</span> Acknowledgements
        </h2>
        <p>
          There is no such a thing as a self-taught developer. In one way or
          another, we all learn from others. Those generous enough to share
          their knowledge and experience are the ones who make this community
          thrive. I am grateful and would like to acknowledge some of those
          whose content has helped me along the way:
        </p>
      </div>
      <div className="acknowledgements-list">
        <div id="acks" className="ack-grid">
          {ACKS.map(({ name, url, img, alt, description }) => (
            <article className="ack-card" key={name}>
              <div className="ack-media">
                <img 
                  src={img} 
                  alt={alt || name} 
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/images/placeholder.svg";
                  }}
                />
              </div>
              <h3 className="ack-name">{name}</h3>
              <p className="ack-description">{description}</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="ack-link"
              >
                Visit
              </a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Acknowledgements;

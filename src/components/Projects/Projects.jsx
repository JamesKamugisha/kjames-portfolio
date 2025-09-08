import React from "react";
import "./Projects.css";
import PROJECTS from "../../../public/PROJECTS";

const Projects = () => {
  return (
    <section id="projects" className="projects">
      <h2>
        <span className="identity">&gt;_</span> My latest work
      </h2>
      <p className="projects-sub">
        I enjoy working on projects that solve problems.{" "}
      </p>
      <p className="projects-sub">Work in progress & planned builds</p>

      {/* 👇 this wrapper enables flex centering & multi-column */}
      <div className="projects-wrap">
        {PROJECTS.map(
          ({ title, description, image, link, tags, status }, i) => (
            <article className="project-card" key={title + i}>
              <div className="project-media">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "/images/placeholder.png";
                  }}
                />
              </div>

              <div className="project-body">
                <h3 className="project-title">{title}</h3>
                <p className="project-desc">{description}</p>
                <ul className="project-tags">
                  {tags.map((t) => (
                    <li className="tag" key={t}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="project-footer">
                <a
                  className="project-link"
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View
                </a>
                <span
                  className={`status-badge ${status
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {status}
                </span>
              </div>
            </article>
          )
        )}
      </div>
    </section>
  );
};

export default Projects;

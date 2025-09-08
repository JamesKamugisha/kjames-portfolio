import React, { useState } from "react";
import "./contact.css";
import { sendContactEmail } from "../../services/emailService";

const Contact = () => {
  const [status, setStatus] = useState({ state: "idle", msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      setStatus({
        state: "error",
        msg: "Please fill in all required fields correctly.",
      });
      return;
    }

    setStatus({ state: "sending", msg: "Sending..." });

    try {
      // Get form data
      const formData = {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value,
      };

      // Send email using EmailJS
      const result = await sendContactEmail(formData);

      if (result.success) {
        setStatus({
          state: "success",
          msg: result.message,
        });
        form.reset();
      } else {
        setStatus({
          state: "error",
          msg: result.message,
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      setStatus({
        state: "error",
        msg: "Sorry, there was an error sending your message. Please try again later.",
      });
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="contact-header">
        <h2>
          <span className="identity">&gt;_</span> Get in Touch
        </h2>
        <p className="contact-sub">
          Have an opportunity, a question, or feedback? I’d love to hear from
          you.
        </p>
      </div>

      <div className="contact-grid">
        {/* Left column (smaller) */}
        <aside className="contact-left">
          <h3 className="left-title">Let’s build something</h3>
          <p className="left-text">
            I’m open to freelance work, collaborations, and full-time roles.
            Share a few details about your project, timeline, and goals. I’ll
            get back to you within 24–48 hours.
          </p>
          <ul className="left-list">
            <li>Web apps (React, Node.js)</li>
            <li>Mobile apps (React Native)</li>
            <li>APIs & integrations</li>
            <li>Code reviews & mentoring</li>
          </ul>
        </aside>

        {/* Right column (larger) */}
        <div className="contact-right">
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g., Jane Doe"
                  required
                  className="contact-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Your Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="contact-input"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message *</label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Tell me a bit about your project or question…"
                required
                className="contact-textarea"
              />
            </div>

            <div className="actions">
              <button
                type="submit"
                className="contact-button"
                disabled={status.state === "sending"}
              >
                {status.state === "sending" ? "Sending…" : "Send Message"}
              </button>
              <span
                className={`form-status ${status.state}`}
                role="status"
                aria-live="polite"
              >
                {status.msg}
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

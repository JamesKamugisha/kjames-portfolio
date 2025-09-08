import "./footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p>
        &copy; {new Date().getFullYear()} James Kamugisha. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;

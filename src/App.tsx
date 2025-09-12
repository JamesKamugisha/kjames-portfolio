import React from "react";
import "./index.css";
import { PortfolioProvider } from "./context/PortfolioContext";
import { ErrorBoundary } from "./components/ErrorBoundary/ErrorBoundary";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import About from "./components/About/About";
import Projects from "./components/Projects/Projects";
import Acknowledgements from "./components/Acknowledgements/Acknowledgements";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import SmallGlobe from "./components/SmallGlobe/SmallGlobe";

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <PortfolioProvider>
        <div className="app">
          <Navbar />
          <main>
            <Hero />
            <About />
            <hr className="custom-hr" />
            <Projects />
            <hr className="custom-hr" />
            <Acknowledgements />
            <Contact />
          </main>
          <div className="footer-divider">
            <SmallGlobe />
          </div>
          <Footer />
        </div>
      </PortfolioProvider>
    </ErrorBoundary>
  );
};

export default App;

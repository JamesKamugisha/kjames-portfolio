import React, { useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import './ParticleBackground.css';

const ParticleBackground: React.FC = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadSlim(engine);
  }, []);

  const particlesConfig = {
    background: { 
      color: "transparent" 
    },
    fpsLimit: 60,
    particles: {
      number: { 
        value: 80 
      },
      color: { 
        value: ["#06f", "#0ff", "#f0f", "#ff6600", "#069494"] 
      },
      links: { 
        enable: true, 
        color: "#069494", 
        opacity: 0.4, 
        distance: 150 
      },
      move: { 
        enable: true, 
        speed: 2, 
        random: true, 
        outModes: {
          default: "bounce"
        }
      },
      opacity: { 
        value: 0.8 
      },
      size: { 
        value: { 
          min: 1, 
          max: 4 
        } 
      }
    },
    interactivity: {
      events: { 
        onHover: { 
          enable: true, 
          mode: "grab" 
        } 
      },
      modes: { 
        grab: { 
          distance: 200, 
          links: { 
            opacity: 0.7 
          } 
        } 
      }
    }
  };

  return (
    <div className="particle-background">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
        className="tsparticles"
      />
    </div>
  );
};

export default ParticleBackground;

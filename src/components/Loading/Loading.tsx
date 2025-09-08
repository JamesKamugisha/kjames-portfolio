import React from 'react';
import './Loading.css';

interface LoadingProps {
  type?: 'spinner' | 'skeleton' | 'dots';
  size?: 'small' | 'medium' | 'large';
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  type = 'spinner', 
  size = 'medium', 
  text = 'Loading...' 
}) => {
  if (type === 'skeleton') {
    return (
      <div className={`loading-skeleton ${size}`}>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
      </div>
    );
  }

  if (type === 'dots') {
    return (
      <div className={`loading-dots ${size}`}>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    );
  }

  return (
    <div className={`loading-spinner ${size}`} role="status" aria-label={text}>
      <div className="spinner"></div>
      {text && <span className="loading-text">{text}</span>}
    </div>
  );
};

export default Loading;

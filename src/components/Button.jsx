import React from 'react';
import './Button.css';

export default function Button({ children, variant = 'primary', onClick, type = 'button', className = '', ...props }) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      {...props}
    >
      <span className="btn-content">{children}</span>
    </button>
  );
}

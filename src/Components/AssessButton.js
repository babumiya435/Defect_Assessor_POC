import React from 'react';

export default function AssessButton({ onClick }) {
  return (
    <button
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '50%',
        backgroundColor: '#007bff',
        color: 'white',
        fontSize: '18px',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
      }}
      onClick={onClick}
    >
      Assess
    </button>
  );
}

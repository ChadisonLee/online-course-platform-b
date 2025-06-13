import React from 'react';

export default function Loading() {
    return (
        <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div className="spinner" />
            <style>{`
        .spinner {
          margin: 0 auto;
          width: 40px;
          height: 40px;
          border: 5px solid lightgray;
          border-top-color: #61dafb;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
        </div>
    );
}
import React from 'react';
import { FaPhoneAlt } from 'react-icons/fa';

const Support = () => {
  return (
    <div className="container d-flex justify-content-center" style={{ marginTop: "100px" }}>
      <div
        className="card d-flex align-items-center justify-content-center w-75 fw-bold shadow-lg"
        style={{
          height: "70vh",
          background: "linear-gradient(135deg, rgba(154, 184, 221, 1), rgba(108, 133, 191, 1))",
          borderRadius: "15px",
          padding: "20px",
          color: "#fff",
        }}
      >
        <FaPhoneAlt size={50} style={{ marginBottom: "20px" }} />
        <h2 style={{ marginBottom: "10px" }}>Call Support</h2>
        <p style={{ fontSize: "1.2rem", marginBottom: "5px" }}>For Assistance, Call:</p>
        <p style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "20px" }}>6547385678</p>
        <button
          style={{
            backgroundColor: "#6c85bf",
            border: "none",
            borderRadius: "25px",
            color: "#fff",
            padding: "10px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#5470a6')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#6c85bf')}
        >
          Call Now
        </button>
      </div>
    </div>
  );
};

export default Support;

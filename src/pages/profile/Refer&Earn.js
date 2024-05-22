import React from "react";

const Refer = () => {
  return (
    <div
      className="container d-flex justify-content-center"
      style={{ marginTop: "100px" }}
    >
      <div
        className="card d-flex align-items-center justify-content-center w-75 fw-bold shadow-lg"
        style={{
          height: "70vh",
          background:
            "linear-gradient(135deg, rgba(154, 184, 221, 1), rgba(108, 133, 191, 1))",
          borderRadius: "15px",
          padding: "20px",
          color: "#fff",
          border: "4px solid",
          borderImage:
            "linear-gradient(135deg, rgba(154, 184, 221, 1), rgba(108, 133, 191, 1)) 1",
          transition: "transform 0.3s ease",
        }}
        onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <h2
          style={{
            marginBottom: "10px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          Refer & Earn
        </h2>
        <p style={{ fontSize: "1.2rem", marginBottom: "5px" }}>
          Share Your Referral Code With Friends:
        </p>
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "20px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          ABC 123
        </p>
        <button
          style={{
            backgroundColor: "#6c85bf",
            border: "none",
            borderRadius: "25px",
            color: "#fff",
            padding: "10px 20px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease, box-shadow 0.3s ease",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#5470a6";
            e.target.style.boxShadow = "0px 4px 15px rgba(0, 0, 0, 0.2)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#6c85bf";
            e.target.style.boxShadow = "none";
          }}
        >
          Share
        </button>
      </div>
    </div>
  );
};

export default Refer;

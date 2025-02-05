import React from "react";
import { useNavigate } from "react-router-dom";
const Error = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
      }}>
      <h1>404 Page Not Found</h1>
      <button className="button" onClick={() => navigate("/dashboard")}>
        Home
      </button>
    </div>
  );
};

export default Error;

// src/components/Linkedin.tsx
import React from "react";
import type { eventData } from "../routes/image.js";

export default function DefaultImage({ event }: { event: eventData }) {
  const containerStyle: React.CSSProperties = {
    background: "#083A1B",
    width: "500px",
    height: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "start",
    color: "white",
    fontFamily: "Inter, sans-serif",
    overflowWrap: "break-word",
    wordBreak: "break-word",
  };

  const text: React.CSSProperties = {
    margin: 0,
  };

  const logoStyle: React.CSSProperties = {
    width: "150px",
  };

  const containerText: React.CSSProperties = {
    width: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  };

  return (
    <div style={containerStyle}>
      <div style={containerText}>
        <img
          src="https://devpr.org/assets/images/icone_dev_pr.svg"
          alt="Logo"
          style={logoStyle}
        />
        <h1 style={text}>{event.title}</h1>
        <h3 style={text}>{event.subtitle}</h3>
        <p style={text}>{event.day}</p>
        <p style={text}>{event.address}</p>
        <p style={text}>{event.city}</p>
      </div>
    </div>
  );
}

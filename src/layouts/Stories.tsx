// src/components/Linkedin.tsx
import React from "react";
import type { eventData } from "../routes/image.js";
import { asset } from "../utils/assets.js";

export default function InstagramImage({ event }: { event: eventData }) {
  const containerStyle: React.CSSProperties = {
    width: "1080px",
    height: "1920px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "start",
    color: "white",
    fontFamily: "Inter, sans-serif",
    overflowWrap: "break-word",
    wordBreak: "break-word",

    backgroundImage: `url(${asset("/backgrounds/stories.png")})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const text: React.CSSProperties = {
    margin: 0,
  };

  const logoStyle: React.CSSProperties = {
    width: "445px",
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
          src={asset("/devpr-logo.png")}
          width={445}
          height={105}
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

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
    textAlign: "center",
    color: "white",
    fontFamily: "Inter, sans-serif",
    overflowWrap: "break-word",
    wordBreak: "break-word",

    backgroundImage: `url(${asset("/backgrounds/stories.png")})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const infoContainer: React.CSSProperties = {
    width: "880px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
  };

  const titleStyle: React.CSSProperties = {
    fontSize: 96,
  };

  const text: React.CSSProperties = {
    margin: 0,
    fontSize: 36,
  };

  const logoStyle: React.CSSProperties = {
    width: "445px",
  };

  const containerText: React.CSSProperties = {
    width: "880px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "48px",
  };

  return (
    <div style={containerStyle}>
      <div style={containerText}>
        <h1 style={titleStyle}>{event.title}</h1>
        <h3 style={text}>{event.subtitle}</h3>
        <div style={infoContainer}>
          <p style={text}>{event.date}</p>
          <p style={text}>{event.address}</p>
          <p style={text}>{event.city}</p>
        </div>
        <img
          src={asset("/devpr-logo.png")}
          width={445}
          height={105}
          alt="Logo"
          style={logoStyle}
        />
      </div>
    </div>
  );
}

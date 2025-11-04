import React from "react";
import FlexContainer from "../components/FlexContainer.js";
import { asset } from "../utils.js";
import type { EventData } from "../types.js";

export default function Instagram({ event }: { event: EventData }) {
  const containerStyle: React.CSSProperties = {
    color: "white",
    fontFamily: "Inter, sans-serif",
    backgroundImage: `url(${asset("/backgrounds/instagram.png")})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const infoContainer: React.CSSProperties = {
    width: "900px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    textAlign: "center",
    color: "white",
  };

  const titleStyle: React.CSSProperties = { fontSize: 64 };
  const textStyle: React.CSSProperties = { margin: 0, fontSize: 24 };
  const talks = Array.isArray(event.talks) ? event.talks : [];

  return (
    <FlexContainer width="1080px" height="1080px" style={containerStyle}>
      <FlexContainer align="flex-start" justify="flex-start" gap={48}>
        <h1 style={titleStyle}>{event.title}</h1>
        <h3 style={textStyle}>{event.subtitle}</h3>
        <div style={infoContainer}>
          <p style={textStyle}>{event.date}</p>
          <p style={textStyle}>{event.address}</p>
          <p style={textStyle}>{event.city}</p>
        </div>
        {talks.length > 0 && (
          <FlexContainer align="flex-start" justify="flex-start" gap={12}>
            <h3>Palestras:</h3>
            {talks.map((talk, index) => (
              <FlexContainer align="flex-start" justify="flex-start" key={index} gap={0}>
                <h3 style={{ margin: 0 }}>{talk.title}</h3>
                <p style={textStyle}>{talk.name}</p>
              </FlexContainer>
            ))}
          </FlexContainer>
        )}
        <img src={asset("/devpr-logo.png")} width={445} height={105} alt="DevPR Logo" />
      </FlexContainer>
    </FlexContainer>
  );
}

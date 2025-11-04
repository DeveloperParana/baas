import React from "react";
import FlexContainer from "../components/FlexContainer.js";
import { asset } from "../utils.js";
import type { EventData } from "../types.js";

export default function Stories({ event }: { event: EventData }) {
  const containerStyle: React.CSSProperties = {
    color: "white",
    fontFamily: "Inter",
    textAlign: "center",
    backgroundImage: `url(${asset("/backgrounds/stories.png")})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const titleStyle: React.CSSProperties = { fontSize: 96 };
  const textStyle: React.CSSProperties = { margin: 0, fontSize: 36 };
  const talks = Array.isArray(event.talks) ? event.talks : [];

  return (
    <FlexContainer width="1080px" height="1920px" style={containerStyle}>
      <FlexContainer gap={48}>
        <h1 style={titleStyle}>{event.title}</h1>
        <h3 style={textStyle}>{event.subtitle}</h3>
        <FlexContainer>
          <p style={textStyle}>{event.date}</p>
          <p style={textStyle}>{event.address}</p>
          <p style={textStyle}>{event.city}</p>
        </FlexContainer>
        {talks.length > 0 && (
          <FlexContainer>
            <h3>Talks</h3>
            {talks.map((talk, index) => (
              <p key={index} style={textStyle}>
                {talk.title} - {talk.name}
              </p>
            ))}
          </FlexContainer>
        )}
        <img src={asset("/devpr-logo.png")} width={445} height={105} alt="DevPR Logo" />
      </FlexContainer>
    </FlexContainer>
  );
}

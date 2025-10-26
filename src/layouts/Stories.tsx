import React from "react";
import { asset } from "../utils/assets.js";
import FlexContainer from "../components/FlexContainer.js";
import type { EventData } from "../types/event.types.js";

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

  const titleStyle: React.CSSProperties = {
    fontSize: 96,
  };

  const text: React.CSSProperties = {
    margin: 0,
    fontSize: 36,
  };

  return (
    <FlexContainer width="1080px" height="1920px" style={containerStyle}>
      <FlexContainer gap={48}>
        <h1 style={titleStyle}>{event.title}</h1>
        <h3 style={text}>{event.subtitle}</h3>

        <FlexContainer>
          <p style={text}>{event.date}</p>
          <p style={text}>{event.address}</p>
          <p style={text}>{event.city}</p>
        </FlexContainer>

        {Array.isArray(event.talks) && (
          <FlexContainer>
            <h3>Talks</h3>
            {event.talks.map((talk, index) => (
              <p key={index} style={text}>
                {talk.title} - {talk.name}
              </p>
            ))}
          </FlexContainer>
        )}

        <img src={asset("/devpr-logo.png")} width={445} height={105} />
      </FlexContainer>
    </FlexContainer>
  );
}

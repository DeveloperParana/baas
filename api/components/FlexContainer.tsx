import React from "react";
import type { FlexContainerProps } from "../types.js";

export default function FlexContainer({
  width = "900px",
  height = "auto",
  direction = "column",
  align = "center",
  justify = "center",
  gap = "1px",
  fontSize = 24,
  style,
  children,
}: FlexContainerProps) {
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    width,
    height,
    gap,
    fontSize,
    boxSizing: "border-box",
    overflowWrap: "break-word",
    wordBreak: "break-word",
    ...style,
  };

  return <div style={containerStyle}>{children}</div>;
}

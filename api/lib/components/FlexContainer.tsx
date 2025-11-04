import React from "react";

type FlexContainerProps = {
  width?: string;
  height?: string;
  direction?: "row" | "column";
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  gap?: number | string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  fontSize?: number;
};

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
    width: width,
    height: height,
    gap,
    fontSize: fontSize,
    boxSizing: "border-box",
    overflowWrap: "break-word",
    wordBreak: "break-word",
    ...style,
  };

  return <div style={containerStyle}>{children}</div>;
}

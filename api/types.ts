import React from "react";

export type EventData = {
  title: string;
  subtitle: string;
  address: string;
  city: string;
  date: string;
  media: string;
  talks?: Talk[] | string;
};

export type Talk = {
  title: string;
  name: string;
};

export type FlexContainerProps = {
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

export type LayoutComponent = React.ComponentType<{ event: EventData }>;

export type MediaType = "default" | "instagram" | "stories";

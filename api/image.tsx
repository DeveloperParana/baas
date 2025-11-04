import type { VercelRequest, VercelResponse } from '@vercel/node';
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { dirname, join } from "path";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import React from "react";

// Types
type EventData = {
  title: string;
  subtitle: string;
  address: string;
  city: string;
  date: string;
  media: string;
  talks?: Talk[] | string;
};

type Talk = {
  title: string;
  name: string;
};

// Constants
const MEDIA_SIZES = {
  default: { height: 500, width: 500 },
  instagram: { height: 1080, width: 1080 },
  stories: { height: 1920, width: 1080 },
};

const BUCKET_BASE = "https://pub-e7d551bfe635419791fb1d1bfc7f71dd.r2.dev/assets";

// Utils
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function asset(path: string): string {
  return `${BUCKET_BASE}${path.startsWith("/") ? "" : "/"}${path}`;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function loadFont(path: string): Promise<Buffer> {
  const normalizedPath = path.replace(/^\.\.\//, "");
  const pathsToTry = [
    join(__dirname, path),
    join(__dirname, normalizedPath),
    join(process.cwd(), "api", "lib", normalizedPath),
    join(process.cwd(), "src", normalizedPath),
    join(process.cwd(), "dist", normalizedPath),
    join(process.cwd(), normalizedPath),
    join(process.cwd(), "api", "lib", "assets", normalizedPath.replace(/^assets\//, "")),
    join(process.cwd(), "src", "assets", normalizedPath.replace(/^assets\//, "")),
  ];

  for (const fontPath of pathsToTry) {
    try {
      return await readFile(fontPath);
    } catch (error) {
      continue;
    }
  }

  throw new Error(`Não foi possível carregar a fonte: ${path}. Tentou: ${pathsToTry.join(", ")}`);
}

// Components
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

function FlexContainer({
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

// Layouts
function Instagram({ event }: { event: EventData }) {
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
  const text: React.CSSProperties = { margin: 0, fontSize: 24 };

  return (
    <FlexContainer width="1080px" height="1080px" style={containerStyle}>
      <FlexContainer align="flex-start" justify="flex-start" gap={48}>
        <h1 style={titleStyle}>{event.title}</h1>
        <h3 style={text}>{event.subtitle}</h3>
        <div style={infoContainer}>
          <p style={text}>{event.date}</p>
          <p style={text}>{event.address}</p>
          <p style={text}>{event.city}</p>
        </div>
        {Array.isArray(event.talks) && (
          <FlexContainer align="flex-start" justify="flex-start" gap={12}>
            <h3>Palestras:</h3>
            {event.talks.map((talk, index) => (
              <FlexContainer align="flex-start" justify="flex-start" key={index} gap={0}>
                <h3 style={{ margin: 0 }}>{talk.title}</h3>
                <p style={text}>{talk.name}</p>
              </FlexContainer>
            ))}
          </FlexContainer>
        )}
        <img src={asset("/devpr-logo.png")} width={445} height={105} />
      </FlexContainer>
    </FlexContainer>
  );
}

function Stories({ event }: { event: EventData }) {
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
  const text: React.CSSProperties = { margin: 0, fontSize: 36 };

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

// Main function
async function generateImage(event: EventData): Promise<Buffer> {
  const size = MEDIA_SIZES[event.media as keyof typeof MEDIA_SIZES] || MEDIA_SIZES.default;
  const layoutName = capitalize(event.media);
  const Component = layoutName === "Stories" ? Stories : Instagram;

  const [regularFont, boldFont] = await Promise.all([
    loadFont("../assets/fonts/Inter-Regular.ttf"),
    loadFont("../assets/fonts/Inter-Bold.ttf"),
  ]);

  const svg = await (satori as any)(<Component event={event} />, {
    width: size.width,
    height: size.height,
    fonts: [
      { name: "Inter", data: regularFont, weight: 400, style: "normal" },
      { name: "Inter", data: boldFont, weight: 700, style: "normal" },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: size.width },
  });

  const pngData = resvg.render();
  return pngData.asPng();
}

// Handler
function parseEventData(query: any): EventData {
  let talks: Talk[] | undefined;
  if (query.talks) {
    talks = JSON.parse(String(query.talks));
  }
  return {
    title: query.title ?? "",
    subtitle: query.subtitle ?? "",
    date: query.date ?? "",
    address: query.address ?? "",
    city: query.city ?? "",
    media: query.media ?? "instagram",
    talks: talks ?? [],
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const qs = parseEventData(req.query);
    const pngBuffer = await generateImage(qs as EventData);

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
    return res.send(pngBuffer);
  } catch (error) {
    console.error("Erro ao gerar imagem:", error);
    return res.status(500).send("Erro ao carregar imagem");
  }
}

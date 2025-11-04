import type { VercelRequest, VercelResponse } from '@vercel/node';
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { dirname, join } from "path";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import React from "react";

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

type MediaType = "default" | "instagram" | "stories";
type LayoutComponent = React.ComponentType<{ event: EventData }>;

const MEDIA_SIZES = {
  default: { height: 500, width: 500 },
  instagram: { height: 1080, width: 1080 },
  stories: { height: 1920, width: 1080 },
} as const;

const BUCKET_BASE = "https://pub-e7d551bfe635419791fb1d1bfc7f71dd.r2.dev/assets";

const FONT_PATHS = {
  regular: "../assets/fonts/Inter-Regular.ttf",
  bold: "../assets/fonts/Inter-Bold.ttf",
} as const;

const FONT_CONFIG = {
  name: "Inter" as const,
  weights: { regular: 400, bold: 700 } as const,
  style: "normal" as const,
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
  "Access-Control-Allow-Headers": "Content-Type",
} as const;

const CACHE_HEADERS = {
  "Content-Type": "image/png",
  "Cache-Control": "public, max-age=3600, s-maxage=3600",
} as const;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function asset(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${BUCKET_BASE}${normalizedPath}`;
}

async function loadFont(path: string): Promise<Buffer> {
  const normalizedPath = path.replace(/^\.\.\//, "");
  const pathsToTry = [
    join(__dirname, path),
    join(__dirname, normalizedPath),
    join(process.cwd(), "api", "_lib", normalizedPath),
    join(process.cwd(), "src", normalizedPath),
    join(process.cwd(), "dist", normalizedPath),
    join(process.cwd(), normalizedPath),
    join(process.cwd(), "api", "_lib", "assets", normalizedPath.replace(/^assets\//, "")),
    join(process.cwd(), "src", "assets", normalizedPath.replace(/^assets\//, "")),
  ];

  for (const fontPath of pathsToTry) {
    try {
      return await readFile(fontPath);
    } catch {
      continue;
    }
  }

  throw new Error(`Font not found: ${path}. Attempted paths: ${pathsToTry.join(", ")}`);
}

function parseTalks(talksParam: unknown): Talk[] {
  if (!talksParam) return [];
  
  try {
    const parsed = typeof talksParam === "string" 
      ? JSON.parse(talksParam) 
      : talksParam;
    
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

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

const LAYOUT_MAP: Record<string, LayoutComponent> = {
  Stories,
  Instagram,
};

async function generateImage(event: EventData): Promise<Buffer> {
  const mediaType = (event.media || "instagram") as MediaType;
  const size = MEDIA_SIZES[mediaType] || MEDIA_SIZES.default;
  const layoutName = capitalize(mediaType);
  const Component = LAYOUT_MAP[layoutName] || Instagram;

  const [regularFont, boldFont] = await Promise.all([
    loadFont(FONT_PATHS.regular),
    loadFont(FONT_PATHS.bold),
  ]);

  const svg = await (satori as any)(<Component event={event} />, {
    width: size.width,
    height: size.height,
    fonts: [
      {
        name: FONT_CONFIG.name,
        data: regularFont,
        weight: FONT_CONFIG.weights.regular,
        style: FONT_CONFIG.style,
      },
      {
        name: FONT_CONFIG.name,
        data: boldFont,
        weight: FONT_CONFIG.weights.bold,
        style: FONT_CONFIG.style,
      },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: size.width },
  });

  const pngData = resvg.render();
  return pngData.asPng();
}

function parseEventData(query: Record<string, unknown>): EventData {
  return {
    title: String(query.title || ""),
    subtitle: String(query.subtitle || ""),
    date: String(query.date || ""),
    address: String(query.address || ""),
    city: String(query.city || ""),
    media: String(query.media || "instagram"),
    talks: parseTalks(query.talks),
  };
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<VercelResponse> {
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const eventData = parseEventData(req.query);
    const pngBuffer = await generateImage(eventData);

    Object.entries(CACHE_HEADERS).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    return res.send(pngBuffer);
  } catch (error) {
    console.error("Error generating image:", error);
    return res.status(500).json({ error: "Failed to generate image" });
  }
}

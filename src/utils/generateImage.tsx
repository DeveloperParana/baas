import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { dirname, join } from "path";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import type { eventData } from "../routes/image.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function generateImage(event: eventData) {
  const fontData = await readFile(
    join(__dirname, "../fonts/Inter-Regular.ttf")
  );

  const containerStyle: React.CSSProperties = {
    background: "#083A1B",
    width: "500px",
    height: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "start",
    color: "white",
    fontFamily: "Inter, sans-serif",
    overflowWrap: "break-word",
    wordBreak: "break-word",
  };

  const text: React.CSSProperties = {
    margin: 0,
  };

  const logoStyle: React.CSSProperties = {
    width: "150px",
  };

  const containerText: React.CSSProperties = {
    width: "500px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  };

  const svg = await satori(
    <div style={containerStyle}>
      <div style={containerText}>
        <img
          src="https://devpr.org/assets/images/icone_dev_pr.svg"
          alt="Logo"
          style={logoStyle}
        />
        <h1 style={text}>{event.title}</h1>
        <h3 style={text}>{event.subtitle}</h3>
        <p style={text}>{event.day}</p>
        <p style={text}>{event.address}</p>
        <p style={text}>{event.city}</p>
      </div>
    </div>,
    {
      width: 500,
      height: 500,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          weight: 400,
          style: "normal",
        },
      ],
    }
  );

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: 600 },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return pngBuffer;
}

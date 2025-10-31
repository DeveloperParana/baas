import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { dirname, join } from "path";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { capitalize } from "./capitalize.js";
import { MEDIA_SIZES } from "../constants/mediaSizes.js";
import type { EventData } from "../types/event.types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function generateImage(event: EventData) {
  const size = MEDIA_SIZES[event.media as keyof typeof MEDIA_SIZES];

  const module = await import(`../layouts/${capitalize(event.media)}.js`);
  let Component = module.default;

  const svg = await satori(<Component event={event} />, {
    width: size.width,
    height: size.height,
    fonts: [
      {
        name: "Inter",
        data: await readFile(
          join(__dirname, "../assets/fonts/Inter-Regular.ttf")
        ),
        weight: 400,
        style: "normal",
      },
      {
        name: "Inter",
        data: await readFile(join(__dirname, "../assets/fonts/Inter-Bold.ttf")),
        weight: 700,
        style: "normal",
      },
    ],
  });

  const resvg = new Resvg(svg, {
    fitTo: { mode: "width", value: size.width },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();

  return pngBuffer;
}

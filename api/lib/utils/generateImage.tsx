import satori from "satori";
import type { SatoriOptions } from "satori";
import { Resvg } from "@resvg/resvg-js";
import { dirname, join } from "path";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { capitalize } from "./capitalize.js";
import { MEDIA_SIZES } from "../constants/mediaSizes.js";
import type { EventData } from "../types/event.types.js";

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

export async function generateImage(event: EventData) {
  const size = MEDIA_SIZES[event.media as keyof typeof MEDIA_SIZES];

  const layoutName = capitalize(event.media);
  let Component;
  
  try {
    const module = await import(`../layouts/${layoutName}.js`);
    Component = module.default;
  } catch (error) {
    try {
      const module = await import(`../layouts/${layoutName}.tsx`);
      Component = module.default;
    } catch (error2) {
      try {
        const module = await import(`../layouts/${layoutName}`);
        Component = module.default;
      } catch (error3) {
        // Fallback: tentar de src/ também
        const module = await import(`../../src/layouts/${layoutName}.js`);
        Component = module.default;
      }
    }
  }

  const [regularFont, boldFont] = await Promise.all([
    loadFont("../assets/fonts/Inter-Regular.ttf"),
    loadFont("../assets/fonts/Inter-Bold.ttf"),
  ]);

  const svg = await (satori as any)(<Component event={event} />, {
    width: size.width,
    height: size.height,
    fonts: [
      {
        name: "Inter",
        data: regularFont,
        weight: 400,
        style: "normal",
      },
      {
        name: "Inter",
        data: boldFont,
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

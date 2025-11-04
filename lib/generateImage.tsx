import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import React from "react";
import { loadFont, capitalize } from "./utils.js";
import { MEDIA_SIZES, FONT_PATHS, FONT_CONFIG } from "./constants.js";
import type { EventData, MediaType, LayoutComponent } from "./types.js";
import Instagram from "./layouts/Instagram.js";
import Stories from "./layouts/Stories.js";

const LAYOUT_MAP: Record<string, LayoutComponent> = {
  Stories,
  Instagram,
};

export async function generateImage(event: EventData): Promise<Buffer> {
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

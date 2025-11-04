export const MEDIA_SIZES = {
  default: { height: 500, width: 500 },
  instagram: { height: 1080, width: 1080 },
  stories: { height: 1920, width: 1080 },
} as const;

export const BUCKET_BASE = "https://pub-e7d551bfe635419791fb1d1bfc7f71dd.r2.dev/assets";

export const FONT_PATHS = {
  regular: "../assets/fonts/Inter-Regular.ttf",
  bold: "../assets/fonts/Inter-Bold.ttf",
} as const;

export const FONT_CONFIG = {
  name: "Inter" as const,
  weights: { regular: 400, bold: 700 } as const,
  style: "normal" as const,
};

export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET",
  "Access-Control-Allow-Headers": "Content-Type",
} as const;

export const CACHE_HEADERS = {
  "Content-Type": "image/png",
  "Cache-Control": "public, max-age=3600, s-maxage=3600",
} as const;

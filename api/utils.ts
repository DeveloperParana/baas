import { dirname, join } from "path";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { BUCKET_BASE, FONT_PATHS } from "./constants.js";
import type { Talk } from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function asset(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${BUCKET_BASE}${normalizedPath}`;
}

export async function loadFont(path: string): Promise<Buffer> {
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
    } catch {
      continue;
    }
  }

  throw new Error(`Font not found: ${path}. Attempted paths: ${pathsToTry.join(", ")}`);
}

export function parseTalks(talksParam: unknown): Talk[] {
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

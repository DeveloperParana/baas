import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateImage } from '../lib/generateImage.jsx';
import { parseEventData } from '../lib/parser.js';
import { CORS_HEADERS, CACHE_HEADERS } from '../lib/constants.js';

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

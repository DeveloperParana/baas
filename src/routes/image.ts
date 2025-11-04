import { Router, type Request, type Response } from "express";
import type { VercelRequest, VercelResponse } from '@vercel/node';
import handler from "../../api/image.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  await handler(req as unknown as VercelRequest, res as unknown as VercelResponse);
});

export default router;

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    Object.entries(CORS_HEADERS).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    const eventData = parseEventData(req.query as Record<string, unknown>);
    const pngBuffer = await generateImage(eventData);

    Object.entries(CACHE_HEADERS).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    res.send(pngBuffer);
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({ error: "Failed to generate image" });
  }
});

export default router;

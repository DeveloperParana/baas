import { Router, type Request, type Response } from "express";
import { generateImage } from "../../api/_lib/generateImage.jsx";
import { parseEventData } from "../../api/_lib/parser.js";
import { CORS_HEADERS, CACHE_HEADERS } from "../../api/_lib/constants.js";

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

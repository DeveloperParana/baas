import { Router, type Request, type Response } from "express";
import { generateImage } from "../utils/generateImage.js";
import type { EventData, Talk } from "../types/event.types.js";

const router = Router();

function parseEventData(query: EventData): EventData {
  let talks: Talk[] | undefined;

  if (query.talks) {
    talks = JSON.parse(String(query.talks));
  }

  return {
    title: query.title ?? "",
    subtitle: query.subtitle ?? "",
    date: query.date ?? "",
    address: query.address ?? "",
    city: query.city ?? "",
    media: query.media ?? "instagram",
    talks: talks ?? [],
  };
}

router.get("/", async (req: Request, res: Response) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    const qs = parseEventData(req.query as EventData);
    const pngBuffer = await generateImage(qs as EventData);

    res.setHeader("Content-Type", "image/png");
    res.send(pngBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar imagem");
  }
});

export default router;

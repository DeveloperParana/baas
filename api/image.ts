import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateImage } from './lib/utils/generateImage';
import type { EventData, Talk } from './lib/types/event.types';

function parseEventData(query: any): EventData {
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const qs = parseEventData(req.query);
    const pngBuffer = await generateImage(qs as EventData);

    res.setHeader("Content-Type", "image/png");
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
    return res.send(pngBuffer);
  } catch (error) {
    console.error("Erro ao gerar imagem:", error);
    return res.status(500).send("Erro ao carregar imagem");
  }
}

import { Router } from "express";
import { generateImage } from "../utils/generateImage.js";

const router = Router();

export type eventData = {
  title: string;
  subtitle: string;
  address: string;
  city: string;
  day: string;
  hour: string;
};

router.get("/", async (req, res) => {
  try {
    const qs = req.query;
    const pngBuffer = await generateImage(qs as eventData);

    res.setHeader("Content-Type", "image/png");
    res.send(pngBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao carregar imagem");
  }
});

export default router;

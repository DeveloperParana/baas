// Este arquivo existe apenas para satisfazer a Vercel que precisa de um entrypoint
// Em produção, apenas as serverless functions em api/ são usadas
import express from "express";

const app = express();

// Handler simples para satisfazer a Vercel
export default app;

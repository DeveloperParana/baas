import express from "express";
import router from "./routes/image.js";

const app = express();
const PORT = 3000;

app.use("/api/image", router);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

import express from "express";
import dotenv from "dotenv";

import uploadRoutes from "./routes/upload";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.use(uploadRoutes);

const port = Number(process.env.PORT ?? 3000);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
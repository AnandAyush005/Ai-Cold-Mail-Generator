import express from "express";
import "dotenv/config";
import cors from "cors";
import path from "path";

import authRouter from "./routes/authRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import { connectDb } from "./config/db.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/ai", aiRouter);

// IMPORTANT FIX
const frontendPath = path.join(process.cwd(), "client", "dist");

app.use(express.static(frontendPath));

app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 8000;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log("App is listening on PORT:", PORT);
    });
  })
  .catch(() => {
    console.log("Error while connecting the database");
  });
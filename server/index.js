import express from "express"
import "dotenv/config"
import cors from "cors"

import authRouter from "./routes/authRoutes.js";
import aiRouter from "./routes/aiRoutes.js";
import { connectDb } from "./config/db.js";

import path from "path";

const app = express();
app.use(express.json());
app.use(cors());




// Serve frontend
app.use(express.static(path.join(__dirname, "client", "dist")));

// Catch all frontend routes
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/ai', aiRouter);

const PORT = process.env.PORT || 8000;


connectDb()
.then(()=>{
        app.listen(PORT, ()=>{
        console.log("App is listening on PORT : " , PORT)
    })
})
.catch((e)=>{
    
    console.log("Error while connecting the database");
})
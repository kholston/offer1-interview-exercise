import express from "express";
import HomeRouter from "./controllers/home";

const app = express();

app.use("/test", (req, res) => res.send("Testing Initial Endpoint"));
app.use("/api/v1/homes", HomeRouter);

export default app;

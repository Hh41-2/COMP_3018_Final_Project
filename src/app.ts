import express, { Express } from "express";
import dotenv from "dotenv";

// Load environment variables BEFORE your internal imports!
dotenv.config();

import healthRoute from "./api/v1/routes/healthRoute";
import hofRoute from "./api/v1/routes/hofRoute";
import playerRoute from "./api/v1/routes/playerRoute";
import teamRoute from "./api/v1/routes/teamRoute";
import setupSwagger from "./config/swagger";


// Initialize Express application
const app: Express = express();

// Body parsing middleware
app.use(express.json());

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/v1", healthRoute);
app.use("/api/v1", hofRoute);
app.use("/api/v1", playerRoute);
app.use("/api/v1", teamRoute);

// Setup Swagger
setupSwagger(app);

export default app;
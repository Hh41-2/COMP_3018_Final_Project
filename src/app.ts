import express, { Express } from "express";
import healthRoute from "./api/v1/routes/healthRoute";
import hofRoute from "./api/v1/routes/hofRoute";
import playerRoute from "./api/v1/routes/playerRoute";


// Initialize Express application
const app: Express = express();

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/v1", healthRoute);
app.use("/api/v1", hofRoute);
app.use("/api/v1", playerRoute);


export default app;
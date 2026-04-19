import express, { Express } from "express";
import dotenv from "dotenv";

// Load environment variables BEFORE your internal imports!
dotenv.config();

import morgan from "morgan";
import healthRoute from "./api/v1/routes/healthRoute";
import hofRoute from "./api/v1/routes/hofRoute";
import playerRoute from "./api/v1/routes/playerRoute";
import teamRoute from "./api/v1/routes/teamRoute";
import setupSwagger from "./config/swagger";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import { getHelmetConfig } from "./config/helmetConfig";
import cors from "cors";
import { getCorsOptions } from "./config/corsConfig";
import userRoute from "./api/v1/routes/userRoute"
import adminRoute from "./api/v1/routes/adminRoute"
import multerRoute from "./api/v1/routes/multerRoute"

// Initialize Express application
const app: Express = express();

app.use(getHelmetConfig());
app.use(cors(getCorsOptions()));

app.use(morgan("combined"));
// Logging middleware (should be applied early in the middleware stack)
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
}

// Body parsing middleware
app.use(express.json());

// Access to the files in uploads folder
app.use('/uploads', express.static('uploads'));

// Define a route
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

app.use("/api/v1", healthRoute);
app.use("/api/v1", userRoute);
app.use("/api/v1", adminRoute);
app.use("/api/v1", hofRoute);
app.use("/api/v1", playerRoute);
app.use("/api/v1", teamRoute);
app.use("/api", multerRoute);

// Setup Swagger
setupSwagger(app);


// Global error handling middleware (MUST be applied last)
app.use(errorHandler);
export default app;
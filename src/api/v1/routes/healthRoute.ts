import express, {Router} from "express";
import { healthCheck } from "../controllers/healthController";

const router: Router = express.Router();

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Retrieve health check information
 *     tags: [Health]
 *     responses:
 *       '200':
 *         description: Successfully retrieved health Check information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 uptime:
 *                   type: integer
 *                   example: 12.4408936
 *                 timestamp:
 *                   type: integer
 *                   example: 2026-04-04T21:10:59.941Z
 *                 version:
 *                   type: string
 *                   example: 1.0.0
 */
router.get("/health", healthCheck); 

export default router;
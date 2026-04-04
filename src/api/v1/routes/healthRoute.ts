import express, {Router} from "express";
import { healthCheck } from "../controllers/healthController";

const router: Router = express.Router();

router.get("/health", healthCheck); 

export default router;
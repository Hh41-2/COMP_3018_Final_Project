import express, {Router} from "express";
import { getAllPlayer, getPlayer, createPlayer, updatePlayer, deletePlayer } from "../controllers/playerController";

const router: Router = express.Router();

router.get("/player", getAllPlayer); 
router.get("/player/:id", getPlayer); 
router.post("/player", createPlayer); 
router.put("/player/:id", updatePlayer); 
router.delete("/player/:id", deletePlayer); 

export default router;
import express, {Router} from "express";
import { getAllPlayer, getPlayer, createPlayer, updatePlayer, deletePlayer } from "../controllers/playerController";

const router: Router = express.Router();

router.get("/players", getAllPlayer); 
router.get("/players/:id", getPlayer); 
router.post("/players", createPlayer); 
router.put("/players/:id", updatePlayer); 
router.delete("/players/:id", deletePlayer); 

export default router;
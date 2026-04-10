import express, {Router} from "express";
import * as playerController from "../controllers/playerController";


const router: Router = express.Router();

router.get("/players", playerController.getAllPlayer); 

router.get("/players/:id", playerController.getPlayer);

router.post("/players", playerController.createPlayer); 

router.put("/players/:id", playerController.updatePlayer); 

router.delete("/players/:id", playerController.deletePlayer); 

export default router;
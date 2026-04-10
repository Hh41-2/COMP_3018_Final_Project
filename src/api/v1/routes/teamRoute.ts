import express, {Router} from "express";
import * as teamController from "../controllers/teamController";


const router: Router = express.Router();

router.get("/teams", teamController.getAllTeam); 

router.get("/teams/:id", teamController.getTeam); 

router.post("/teams", teamController.createTeam); 

router.put("/teams/:id", teamController.updateTeam); 

router.delete("/teams/:id", teamController.deleteTeam); 

export default router;
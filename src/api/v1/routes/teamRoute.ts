import express, {Router} from "express";
import { getAllTeam, getTeam, createTeam, updateTeam, deleteTeam } from "../controllers/teamController";

const router: Router = express.Router();

router.get("/teams", getAllTeam); 
router.get("/teams/:id", getTeam); 
router.post("/teams", createTeam); 
router.put("/teams/:id", updateTeam); 
router.delete("/teams/:id", deleteTeam); 

export default router;
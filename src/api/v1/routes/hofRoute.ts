import express, {Router} from "express";
import { getAllHallOfFame, getHallOfFame, createHallOfFame, updateHallOfFame,  deleteHallOfFame } from "../controllers/hofController";

const router: Router = express.Router();

router.get("/hof", getAllHallOfFame); 
router.get("/hof/:id", getHallOfFame); 
router.post("/hof", createHallOfFame); 
router.put("/hof/:id", updateHallOfFame); 
router.delete("/hof/:id", deleteHallOfFame); 

export default router;
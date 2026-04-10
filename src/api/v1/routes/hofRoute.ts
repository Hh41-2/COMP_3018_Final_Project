import express, {Router} from "express";
import * as hofController from "../controllers/hofController";

const router: Router = express.Router();

router.get("/hof", hofController.getAllHallOfFame
); 

router.get("/hof/:id", hofController.getHallOfFame); 

router.post("/hof", hofController.createHallOfFame); 

router.put("/hof/:id", hofController.updateHallOfFame); 

router.delete("/hof/:id", hofController.deleteHallOfFame); 

export default router;
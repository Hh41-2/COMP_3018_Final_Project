import express, {Router} from "express";
import * as playerController from "../controllers/playerController";
import { validateRequest } from "../middleware/validate";
import { playerSchemas } from "../validations/playerSchemas";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { fileStorage } from "../../../config/multerConfig";
const multer = require('multer');

const upload = multer ({ storage : fileStorage});
const router: Router = express.Router();

/**
 * @openapi
 * /players:
 *   get:
 *     summary: Retrieve a list of players
 *     tags: [Player]
 *     responses:
 *       '200':
 *         description: Successfully retrieved all players
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Retrieved players"
 *                 count:
 *                   type: number
 *                   example: 3
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref:'#/components/schemas/player'
 */
router.get("/players", 
       authenticate,
       isAuthorized({hasRole:["admin","manager","user"]}),
       validateRequest(playerSchemas.list),
       playerController.getAllPlayer); 

/**
 * @openapi
 * /players/:id:
 *   get:
 *     summary: Retrieve a player
 *     tags: [Player]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the plyaer
 *     responses:
 *       '200':
 *         description: Successfully retrieved a player with Id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Retrieved a player"
 *                 data:
 *                   $ref: '#/components/schemas/player'
 *       '400':
 *         description: Hall of fame entry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/players/:id",
       authenticate,
       isAuthorized({hasRole:["admin","manager","user"]}),
       validateRequest(playerSchemas.getById),
       playerController.getPlayer);

/**
 * @openapi
 * /players:
 *   post:
 *     summary: Create a new player
 *     tags: [Player]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - position
 *               - dateOfBirth
 *               - country
 *               - era
 *               - teams
 *               - goals
 *               - appearances
 *               - assists
 *               - achievements
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 description: The name of the player
 *               position:
 *                 type: string
 *                 enum: ["Goalkeeper", "Defender", "Midfielder", "Striker"]
 *                 description: The position played by the player
 *               dateOfBirth:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 10
 *                 description: The date of birth of the player (YYYY-MM-DD)
 *               country:
 *                 type: string
 *                 minLength: 1
 *                 description: The country the player is from
 *               era:
 *                 type: string
 *                 minLength: 1
 *                 description: The era/period when the player was active
 *               teams:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: string
 *                   minLength: 1
 *                 description: The list of teams a player has played for
 *               goals:
 *                 type: integer
 *                 minimum: 0
 *                 description: The total number of goals scored by the player
 *               appearances:
 *                 type: integer
 *                 minimum: 0
 *                 description: The total number of appearances made by the player
 *               assists:
 *                 type: integer
 *                 minimum: 0
 *                 description: The total number of assists by the player
 *               achievements:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: string
 *                   minLength: 1
 *                 description: The list of achievements by the player
 *               image:
 *                 type: string
 *                 description: The path for player image
 *     responses:
 *       '201':
 *         description: Successfully created a new player
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/player'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/players",
       authenticate,
       isAuthorized({hasRole:["admin","manager"]}),
       validateRequest(playerSchemas.create),
       playerController.createPlayer); 

/**
 * @openapi
 * /players/:id:
 *   put:
 *     summary: Update a player
 *     tags: [Player]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the player
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 description: The name of the player
 *               position:
 *                 type: string
 *                 enum: ["Goalkeeper", "Defender", "Midfielder", "Striker"]
 *                 description: The position played by the player
 *               dateOfBirth:
 *                 type: string
 *                 minLength: 10
 *                 maxLength: 10
 *                 description: The date of birth of the player (YYYY-MM-DD)
 *               country:
 *                 type: string
 *                 minLength: 1
 *                 description: The country the player is from
 *               era:
 *                 type: string
 *                 minLength: 1
 *                 description: The era/period when the player was active
 *               teams:
 *                 type: array
 *                 minItems: 1
 *                 items:
 *                   type: string
 *                   minLength: 1
 *                 description: The list of teams a player has played for
 *               goals:
 *                 type: integer
 *                 minimum: 0
 *                 description: The total number of goals scored by the player
 *               appearances:
 *                 type: integer
 *                 minimum: 0
 *                 description: The total number of appearances made by the player
 *               assists:
 *                 type: integer
 *                 minimum: 0
 *                 description: The total number of assists by the player
 *               achievements:
 *                 type: array
 *                 items:
 *                   type: string
 *                   minLength: 1
 *                 description: The list of achievements by the player
 *               image:
 *                 type: string
 *                 description: The path for player image
 *     responses:
 *       '200':
 *         description: Successfully updated the player
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/player'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '404':
 *         description: Player not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/players/:id",
       authenticate,
       isAuthorized({hasRole:["admin","manager"]}),
       upload.single('image'),
       validateRequest(playerSchemas.update),
       playerController.updatePlayer); 

/**
 * @openapi
 * /players/:id:
 *   delete:
 *     summary: Delete a player
 *     tags: [Player]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the plyaer
 *     responses:
 *       '200':
 *         description: Successfully deleted a player with Id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Deleted a player"
 *                 data:
 *                   $ref: '#/components/schemas/player'
 *       '400':
 *         description: Player not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/players/:id",
       authenticate,
       isAuthorized({hasRole:["admin"]}),
       validateRequest(playerSchemas.delete),
       playerController.deletePlayer); 

export default router;
import express, {Router} from "express";
import * as teamController from "../controllers/teamController";
import { validateRequest } from "../middleware/validate";
import { teamSchemas } from "../validations/teamSchemas";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";


const router: Router = express.Router();

/**
 * @openapi
 * /teams:
 *   get:
 *     summary: Retrieve a list of all teams
 *     tags: [Team]
 *     responses:
 *       '200':
 *         description: Successfully retrieved all teams
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Retrieved all teams"
 *                 count:
 *                   type: number
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/team'
 */
router.get("/teams",
       authenticate,
       isAuthorized({hasRole:["admin","manager","user"]}),
       validateRequest(teamSchemas.list),
       teamController.getAllTeam); 

/**
 * @openapi
 * /teams/:id:
 *   get:
 *     summary: Retrieve a team
 *     tags: [Team]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the team
 *     responses:
 *       '200':
 *         description: Successfully retrieved a team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Retrieved a team"
 *                 data:
 *                   $ref: '#/components/schemas/team'
 *       '404':
 *         description: Team not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get("/teams/:id",
       authenticate,
       isAuthorized({hasRole:["admin","manager","user"]}),
       validateRequest(teamSchemas.getById),
       teamController.getTeam); 

/**
 * @openapi
 * /teams:
 *   post:
 *     summary: Create a new team
 *     tags: [Team]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - league
 *               - founded
 *               - achievements
 *               - players
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 description: The name of the team
 *               league:
 *                 type: string
 *                 minLength: 1
 *                 description: The league the team plays in
 *               founded:
 *                 type: integer
 *                 minimum: 1800
 *                 description: The year the team was founded
 *               achievements:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of major achievements
 *               players:
 *                 type: integer
 *                 minimum: 11
 *                 maximum: 30
 *                 description: Total number of players on the team
 *     responses:
 *       '201':
 *         description: Successfully created a new team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/team'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/teams",
       authenticate,
       isAuthorized({hasRole:["admin","manager"]}),
       validateRequest(teamSchemas.create),
       teamController.createTeam); 

       /**
 * @openapi
 * /teams/:id:
 *   put:
 *     summary: Update a team
 *     tags: [Team]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the team
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 description: The name of the team
 *               league:
 *                 type: string
 *                 minLength: 1
 *                 description: The league the team plays in
 *               founded:
 *                 type: integer
 *                 minimum: 1800
 *                 description: The year the team was founded
 *               achievements:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: List of major achievements
 *               players:
 *                 type: integer
 *                 minimum: 11
 *                 maximum: 30
 *                 description: Total number of players on the team
 *     responses:
 *       '200':
 *         description: Successfully updated the team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/team'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       '404':
 *         description: Team not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put("/teams/:id",
       authenticate,
       isAuthorized({hasRole:["admin","manager"]}),
       validateRequest(teamSchemas.update),
       teamController.updateTeam); 


/**
 * @openapi
 * /teams/:id:
 *   delete:
 *     summary: Delete a team
 *     tags: [Team]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the team
 *     responses:
 *       '200':
 *         description: Successfully deleted the team
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Removed team with id: team_1"
 *       '404':
 *         description: Team not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete("/teams/:id",
       authenticate,
       isAuthorized({hasRole:["admin"]}),
       validateRequest(teamSchemas.delete),
       teamController.deleteTeam); 


export default router;
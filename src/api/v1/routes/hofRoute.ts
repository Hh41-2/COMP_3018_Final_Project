import express, {Router} from "express";
import * as hofController from "../controllers/hofController";
import { validateRequest } from "../middleware/validate";
import { hofSchemas } from "../validations/hofSchemas";
import authenticate from "../middleware/authenticate";
import isAuthorized from "../middleware/authorize";
import { fileStorage } from "../../../config/multerConfig";
const multer = require('multer');

const upload = multer ({ storage : fileStorage});

const router: Router = express.Router();

/**
 * @openapi
 * /hof:
 *   get:
 *     summary: Retrieve a list of hall of fame entry
 *     tags: [HOF]
 *     responses:
 *       '200':
 *         description: Successfully retrieved all hall of fame entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Retrieved hall of fame entry"
 *                 count:
 *                   type: number
 *                   example: 1
 *                 events:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/hof'
 */ 
router.get("/hof", 
       authenticate,
       isAuthorized({hasRole:["admin","manager","user"]}),
       validateRequest(hofSchemas.list),
       hofController.getAllHallOfFame
); 

/**
 * @openapi
 * /hof/:id:
 *   get:
 *     summary: Retrieve a hall of fame entry
 *     tags: [HOF]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the hall of fame entry
 *     responses:
 *       '200':
 *         description: Successfully retrieved a hall of fame entry with Id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Retrieved a hall of fame entry"
 *                 data:
 *                   $ref: '#/components/schemas/hof'
 *       '400':
 *         description: Hall of fame entry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error'
 */
router.get("/hof/:id",
       authenticate,
       isAuthorized({hasRole:["admin","manager","user"]}),
       validateRequest(hofSchemas.getById),
       hofController.getHallOfFame); 

/**
 * @openapi
 * /hof/:id:
 *   post:
 *     summary: Create a hall of fame entry
 *     tags: [HOF]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the player
 *     responses:
 *       '201':
 *         description: Successfully created a Hall of fame entry with given information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/hof'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error'
 */
router.post("/hof/:id",
       authenticate,
       isAuthorized({hasRole:["admin","manager"]}),
       hofController.createHallOfFame); 

/**
 * @openapi
 * /hof/:id:
 *   put:
 *     summary: Update a hall of fame entry
 *     tags: [HOF]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the hall of fame entry
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *               inductionYear:
 *                 type: integer
 *                 minimum: 0
 *               achievements:
 *                 type: array
 *                 items:
 *                   type: string
 *                   minLength: 1
 *                 minItems: 3
 *               description:
 *                 type: string
 *                 minLength: 1
 *               image:
 *                 type: string
 *                 description: The image path/URL of the player
 *     responses:
 *       '200':
 *         description: Successfully updated the hall of fame entry
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/hof'
 *       '400':
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error'
 *       '404':
 *         description: Hall of fame entry not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error'
 */
router.put("/hof/:id",
       authenticate,
       isAuthorized({hasRole:["admin","manager"]}),
       upload.single('image'),
       validateRequest(hofSchemas.update),
       hofController.updateHallOfFame); 



/**
 * @openapi
 * /hof/:id:
 *   delete:
 *     summary: Delete a hall of Fame entry
 *     tags: [HOF]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the plyaer
 *     responses:
 *       '200':
 *         description: Successfully deleted a hall of fame entry with Id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Removed a hall of Fame entry with id: hof_1"
 *                 data:
 *                   $ref: '#/components/schemas/hof'
 *       '400':
 *         description: Player not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/error'
 */
router.delete("/hof/:id",
       authenticate,
       isAuthorized({hasRole:["admin"]}),
       validateRequest(hofSchemas.delete),
       hofController.deleteHallOfFame); 

export default router;
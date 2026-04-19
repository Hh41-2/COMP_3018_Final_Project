/**
 * @openapi
 * components:
 *   schemas:
 *     hof:
 *       type: object
 *       required:
 *         - inductionYear
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the hall of fame
 *         name:
 *           type: string
 *         playerId:
 *           type: string
 *           description: Player's id
 *         inductionYear:
 *           type: number
 *           description: The year the player was inducted
 *         achievements:
 *           type: array
 *           minItems: 3 
 *           description: List of major achievements
 *           items:
 *             type: string
 *         description:
 *           type: string
 *           description: A detailed description of the player's legacy and accomplishments
 *         image:
 *           type: string
 *           description: The path for player image 
 */

export interface HallOfFame {
       id: string, // Unique identifier for a hall of fame entry
       name: string, // Players name
       playerId: string, // The unique identifier of the inducted player
       inductionYear: number, // The year the player was inducted
       achievements: string[], // List of major achievements that led to induction
       description?: string // A detailed description of the player's legacy and accomplishments
       image?:string // The path for player image
}
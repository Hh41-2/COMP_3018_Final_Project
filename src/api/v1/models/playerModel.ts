/**
 * @openapi
 * components:
 *   schemas:
 *     player:
 *       type: object
 *       required:
 *         - name
 *         - position
 *         - dateOfBirth
 *         - country
 *         - era
 *         - teams
 *         - goals
 *         - appearances
 *         - assists
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the player
 *         name:
 *           type: string
 *           description: The name of the player
 *         position:
 *           type: string
 *           description: The position played by the player
 *           enum: ["Goalkeeper", "Defender", "Midfielder","Striker"]
 *           example: "Midfielder"
 *         dateOfBirth:
 *           type: string
 *           description: The date of birth of the player
 *           example: "YYYYMMDD"
 *         country:
 *           type: string
 *           description: The country the player is from
 *         era:
 *           type: string
 *           description: The era/period when the player was active
 *           example: "1999-2020"
 *         teams:
 *           type: array
 *           minItems: 1 
 *           description: List of teams a player has played for
 *           items:
 *             type: string
 *         goals:
 *           type: number 
 *           description: Total number of goals scored by the player
 *         appearances:
 *           type: number
 *           description: Total number of appearances made by the player 
 *         assists:
 *           type: number
 *           description: The total number of assists by the player
 */

export interface Player {
       id: string, // Unique Identifier for a player
       name: string, // The name of the player
       position: string, // The position played by the player
       dateOfBirth: string, // The date of birth of the player
       country: string, // The country the player is from
       era: string, // The era/period when the player was active
       teams: string[], // List of teams a player has played for
       goals: number, // Total number of goals scored by the player 
       appearances: number, // Total number of appearances made by the player 
       assists: number // The total number of assists by the player 
}
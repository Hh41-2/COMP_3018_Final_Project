/**
 * @openapi
 * components:
 *   schemas:
 *     team:
 *       type: object
 *       required:
 *         - name
 *         - country
 *         - founded
 *         - achievements
 *         - players
 *       properties:
 *         id:
 *           type: string
 *           description: Unique identifier for the team
 *         name:
 *           type: string
 *           description: The name of the team
 *         league:
 *           type: string
 *           description: The league the team plays in
 *           example: "Premier League"
 *         founded:
 *           type: number
 *           description: The year the team was founded
 *         achievements:
 *           type: array
 *           minItems: 3 
 *           description: List of major achievements
 *           items:
 *             type: string
 *         players:
 *           type: number
 *           description: Total number of players on the team
 */

export interface Team {
       id: string, // Unique identifier for a team
       name: string, // The name of the team
       league: string, // The league the team plays in
       founded: number, // The year the team was founded
       achievements: string[], // List of achievements/titles won by the team
       players: number // Total number of players on the team
}
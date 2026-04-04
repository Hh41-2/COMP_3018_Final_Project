export interface HallOfFame {
       id: string, // Unique identifier for a hall of fame entry
       playerId: string, // The unique identifier of the inducted player
       inductionYear: number, // The year the player was inducted
       achievements: string[], // List of major achievements that led to induction
       description: string // A detailed description of the player's legacy and accomplishments
}
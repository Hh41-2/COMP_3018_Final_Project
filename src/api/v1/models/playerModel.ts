export interface Player {
       id: string, // Unique Identifier for a player
       name: string, // The name of the player
       position: string, // The position played by the player
       dateOfBirth: string, //  The date of birth of the player
       country: string, // The country the player is from
       era: string, // The era/period when the player was active
       teams: string[], // List of teams a player has played for
       goals: number, // Total number of goals scored by the player 
       appearances: number, // Total number of appearances made by the player 
       assists: number // The total number of assists by the player 
}
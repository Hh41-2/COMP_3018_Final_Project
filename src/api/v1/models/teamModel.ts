export interface Team {
       id: string, // Unique identifier for a team
       name: string, // The name of the team
       country: string, // The country the team is from
       founded: number, // The year the team was founded
       achievements: string[], // List of achievements/titles won by the team
       players: number // Total number of players on the team
}
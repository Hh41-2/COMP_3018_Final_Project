# Project Proposal and Planning

## 1. Project Concept
My theme for the final project will be Soccer Hall of Fame Management system. 

The purpose of this theme is to build a RESTful API to create a hall of fame for professional soccer players throughout the history and showcase their achievements. 

## 2. Scope and Functionality

### Resources and Endpoints

#### Players
Model:
{
  id: string,
  name: string,
  position: string,
  dateOfBirth: date,
  country: string,
  era: string,
  teams: array of strings,
  goals: number,
  appearances: number,
  assists: number
}

Endpoints:
- 'GET /api/v1/players' - get all the players
- 'GET /api/v1/players/:id' - get a single player
- 'POST /api/v1/players' - create a new player
- 'PUT /api/v1/players/:id' - update a player's information
- 'DELETE /api/v1/players/:id' - delete a player

#### Teams
Model:
{
  id: string,
  name: string,
  country: string,
  founded: date,
  achievements: array of strings,
  players: number of player
}

Endpoints:
- 'GET /api/v1/teams' - get all the teams
- 'GET /api/v1/teams/:id' - get a single team
- 'POST /api/v1/teams' - create a new team
- 'PUT /api/v1/teams/:id' - update a team's information
- 'DELETE /api/v1/teams/:id' - delete a team

#### Hall of Fame
Model:
{
  id: string,
  playerId: string,
  inductionYear: number,
  category: string,
  achievements: array of strings,
  description: string
}

Endpoints:
- 'GET /api/v1/hof' - get all the players in the Hall of Fame
- 'GET /api/v1/hof/:id' - get a single player in the Hall of Fame
- 'POST /api/v1/hof' - add a new player to the Hall of Fame
- 'PUT /api/v1/hof/:id' - update a player's information in the Hall of Fame
- 'DELETE /api/v1/hof/:id' - remove a player from Hall of Fame

## Course Content Alignment
- RESTful API design
- CRUD operations for different resources
- Database connection with Firebase
- Error handling middleware
- Schema validations with Joi
- Security enhancements (CORS, helmet, and environmental variables)
- API documentation with swagger and github pages deployment

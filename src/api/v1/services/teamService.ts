import { Team } from "../models/teamModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const TEAM_COLLECTION = "teams";

/**
 * Retrieves all the teams in the database
 * @returns returns a list of team
 */
export const getAllTeam = async (): Promise<Team[]> => {
       const allTeam = await firestoreRepository.getDocuments(TEAM_COLLECTION);
       
       return allTeam.docs.map(doc => doc.data() as Team);
} 

/**
 * Retrieves the team in the database by id
 * @param id - Unique identifier for the team
 * @returns returns the team with a specified id or null if a team is not found
 */
export const getTeam = async (id: string): Promise<Team | null> => {
       const getTeamById = await firestoreRepository.getDocumentById(TEAM_COLLECTION, id);
       
       return getTeamById ? getTeamById.data() as Team : null;
} 


/**
 * Creates the team in the database
 * @param team: Partial<Team> - Required fields without id for team
 * @returns returns the created team
 */
export const createTeam = async (team: Partial<Team>): Promise<Team> => {
       const createTeam = await firestoreRepository.createDocument(TEAM_COLLECTION, team);

       return createTeam;
} 

/**
 * Updatess the team in the database by id
 * @param id - Unique identifier for the team
 * @param team: Partial<Team> - Required fields without id for team
 * @returns returns the updated team
 */
export const updateTeam = async (id: string, team: Partial<Team>): Promise<Team> => {
       const updateTeam = await firestoreRepository.updateDocument(TEAM_COLLECTION, id, team);

       return updateTeam;
} 

/**
 * Deletes the team in the database by id
 * @param id - Unique identifier for team
 * @returns returns the deleted team's id
 * 
 */
export const deleteTeam = async (id: string): Promise<string> => {
       const deleteTeam: string = await firestoreRepository.deleteDocument(TEAM_COLLECTION, id);

       return deleteTeam;
} 
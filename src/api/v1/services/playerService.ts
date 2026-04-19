import { Player } from "../models/playerModel";
import * as firestoreRepository from "../repositories/firestoreRepository";

const PLAYER_COLLECTION = "players";

/**
 * Retrieves all the players in the database
 * @returns returns a list of player
 */
export const getAllPlayer = async (): Promise<Player[]> => {
       const allPlayer = await firestoreRepository.getDocuments(PLAYER_COLLECTION);

       return allPlayer.docs.map(doc => doc.data() as Player);
} 

/**
 * Retrieves the player in the database by id
 * @param id - Unique identifier for player
 * @returns returns the player with a specified id or null if a player not found
 */
export const getPlayer = async (id: string): Promise<Player | null> => {
       const getSinglePlayer = await firestoreRepository.getDocumentById(PLAYER_COLLECTION, id);

       return getSinglePlayer ? getSinglePlayer.data() as Player : null;
} 

/**
 * Creates the player in the database
 * @param player: Partial<Player> - Required fields without id for player
 * @returns returns the created player
 */
export const createPlayer = async (player: Partial<Player>): Promise<Player> => {
       const createPlayer: Player = await firestoreRepository.createDocument(PLAYER_COLLECTION, player);
       
       return createPlayer;
} 

/**
 * Updates the player in the database by id
 * @param id - Unique identifier for player
 * @param player: Partial<Player> - Required fields without id for player
 * @returns returns the updated player
 */
export const updatePlayer = async (id: string, player: Partial<Player>): Promise<Player> => {
       const updatePlayer: Player = await firestoreRepository.updateDocument(PLAYER_COLLECTION, id, player);
       
       return updatePlayer;
} 

/**
 * Deletes the player in the database by id
 * @param id - Unique identifier for the player
 * @returns returns the deleted player's id
 */
export const deletePlayer = async (id: string): Promise<string> => {
       const deletePlayer: string = await firestoreRepository.deleteDocument(PLAYER_COLLECTION, id);
       
       return deletePlayer;
} 

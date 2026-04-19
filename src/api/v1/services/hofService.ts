import { HallOfFame } from "../models/hofModel";
import { Player } from "../models/playerModel";
import * as firestoreRepository from "../repositories/firestoreRepository";
import { getPlayer } from "../services/playerService"

const HOF_COLLECTION = "hof";
// const PLAYER_COLLECTION = "players";

/**
 * Retrieves all the hall of fame  in the database
 * @returns returns a list of hall of fame
 */
export const getAllHallOfFame = async (): Promise<HallOfFame[]> => {
       const allHallOfFame = await firestoreRepository.getDocuments(HOF_COLLECTION);

       return allHallOfFame.docs.map(doc => doc.data() as HallOfFame);
} 

/**
 * Retrieves the hall of fame in the database by id
 * @param id - Unique identifier for the hall of fame
 * @returns returns the hall of fame with a specified id
 */
export const getHallOfFame = async (id: string): Promise<HallOfFame | null> => {
       const getHallOfFameById = await firestoreRepository.getDocumentById(HOF_COLLECTION, id);

       return getHallOfFameById ? getHallOfFameById.data() as HallOfFame : null;
} 

/**
 * Creates the hall of fame in the database
 * @param hof: Partial<HallOfFame> - Required fields without id for Hall of Fame
 * @returns returns the created hall of fame
 */
export const createHallOfFame = async (id: string): Promise<HallOfFame | null> => {
       // we receive the players id to retrieve the player data and induct them to the Hall of Fame
       // after validating qualification
       const player = await getPlayer(id);

       // return null if player doesnt exist or is not qualified for the Hall of Fame
       if(player === null || !validateQualification(player)){
              return null;
       }

       let inductPlayer: Partial<HallOfFame> = {
              name: player.name,
              playerId: player.id,
              inductionYear: 2026,
              achievements: player.achievements
       }

       if(player.image){
              inductPlayer.image = player.image;
       }

       const getHallOfFameById = await firestoreRepository.createDocument(HOF_COLLECTION, inductPlayer);

       return getHallOfFameById;
} 

/**
 * Updates the hall of fame in the database by id
 * @param id - Unique identifier for the hall of fame
 * @param hof: Partial<HallOfFame> - Required fields without id for Hall of Fame
 * @returns returns the updated hall of fame
 */
export const updateHallOfFame = async (id: string, hof: Partial<HallOfFame>): Promise<HallOfFame> => {
       const updateHallOfFame = await firestoreRepository.updateDocument(HOF_COLLECTION, id, hof);

       return updateHallOfFame;
} 

/**
 * Deletes the hall of fame in the database by id
 * @param id - Unique identifier for the hall of fame
 * @returns returns the deleted hall of fame's id
 */
export const deleteHallOfFame = async (id: string): Promise<string> => {
       const deleteHallOfFame = await firestoreRepository.deleteDocument(HOF_COLLECTION, id);

       return deleteHallOfFame;
} 

const validateQualification = (player: Player | null): boolean => {

       if(player === null || player.achievements === undefined || player.appearances === undefined){
              return false;
       }

       let totalQualificationNum: number = 0;

       if(player.achievements.length > 2){
              totalQualificationNum += 10
       } else {
              totalQualificationNum += 9
       }

       if(player.appearances >= 500){
              totalQualificationNum += 1
       }

       return totalQualificationNum >= 10
}
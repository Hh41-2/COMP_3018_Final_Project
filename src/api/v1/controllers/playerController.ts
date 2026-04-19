import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstant";
import * as playerService from "../services/playerService";
import { successResponse } from "../models/responseModel";
import { Player } from "../models/playerModel";

/**
 * Handles retrieving all players.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getAllPlayer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       try{
              const getAllPlayer: Player[] = await playerService.getAllPlayer();

              res.status(HTTP_STATUS.OK).json({
                     message: "Retrieved all players",
                     totalPlayers: getAllPlayer.length,
                     data: getAllPlayer 
              });
       } catch (error: unknown) {
              next(error);
       }
};

/**
 * Handles retrieving a new player.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getPlayer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       try{
              const getPlayerById: Player | null = await playerService.getPlayer(req.params.id as string);
              
              if(getPlayerById === null){
                     res.status(HTTP_STATUS.BAD_REQUEST).json({message:"Player not found"});
              } 
              res.status(HTTP_STATUS.OK).json(successResponse(
                     `Retrieved player with id: ${req.params.id}`,
                     getPlayerById
              ));
              
       } catch (error: unknown) {
              next(error);
       }
       
};

/**
 * Handles creating a new player.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const createPlayer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       try{
              const createPlayer: Player = await playerService.createPlayer(req.body);

              res.status(HTTP_STATUS.CREATED).json(successResponse(
                     "Player created",
                     createPlayer
              ));
       } catch (error: unknown) {
              next(error);
       }
};

/**
 * Handles updating a player.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const updatePlayer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       try{
              let player = req.body;
              const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

              if(imagePath !== null){
                     player = {
                            ...req.body,
                            image: imagePath
                     }
              }
              
              const updatePlayer: Player = await playerService.updatePlayer(req.params.id as string,player);

              res.status(HTTP_STATUS.OK).json(successResponse(
                     "Player updated",
                     updatePlayer
              ));
       } catch (error: unknown) {
              next(error);
       }
};

/**
 * Handles deleting a player.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const deletePlayer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       try{
              const deletePlayer: string = await playerService.deletePlayer(req.params.id as string);

              res.status(HTTP_STATUS.OK).json(successResponse(
                     `Delete player with id: ${deletePlayer}`
              ));
       } catch (error: unknown) {
              next(error);
       }
};
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstant";
import * as playerService from "../services/playerService";
import { successResponse } from "../models/responseModel";
import { Player } from "../models/playerModel";

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

export const updatePlayer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       try{
              const updatePlayer: Player = await playerService.updatePlayer(req.params.id as string,req.body);

              res.status(HTTP_STATUS.OK).json(successResponse(
                     "Player updated",
                     updatePlayer
              ));
       } catch (error: unknown) {
              next(error);
       }
};

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
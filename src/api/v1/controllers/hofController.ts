import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstant";
import * as hofService from "../services/hofService"
import { HallOfFame } from "../models/hofModel";
import { successResponse } from "../models/responseModel";


/**
 * Handles retrieving all Hall of fame entries.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getAllHallOfFame = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       try{
              const getAllHallOfFame: HallOfFame[] = await hofService.getAllHallOfFame();

              res.status(HTTP_STATUS.OK).json({
                     message: "Retrieved all Hall of Fames",
                     totalPlayers: getAllHallOfFame.length,
                     data: getAllHallOfFame 
              });
       } catch (error: unknown) {
              next(error);
       }
};

/**
 * Handles retrieving a Hall of fame entry.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getHallOfFame = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       try{
              const getHallOfFame: HallOfFame | null = await hofService.getHallOfFame(req.params.id as string);

              if(getHallOfFame === null){
                     res.status(HTTP_STATUS.BAD_REQUEST).json({message:"Hall of Fame not found"});
              }

              res.status(HTTP_STATUS.OK).json(successResponse(
                     `Retrieved Hall of Fame with id: ${req.params.id}`,
                     getHallOfFame
              ));
       } catch (error: unknown) {
              next(error);
       }
};

/**
 * Handles creating a new Hall of fame entry.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const createHallOfFame = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       try{
              if(!req.params.id.includes("players")){
                     res.status(HTTP_STATUS.BAD_REQUEST).json(successResponse(
                            "Please enter a player's id you want to induct to Hall of Fame"
                     ));
                     return;
              }

              const createHallOfFame: HallOfFame | null = await hofService.createHallOfFame(req.params.id as string);

              if(createHallOfFame === null){
                     res.status(HTTP_STATUS.BAD_REQUEST).json(successResponse(
                            "Player does not exist or not qualified for Hall of Fame"
                     ));
                     return;
              }

              res.status(HTTP_STATUS.OK).json(successResponse(
                     `Successfully induct a player to Hall of Fame`,
                     createHallOfFame
              ));
              return;
       } catch (error: unknown) {
              next(error);
       }
};

/**
 * Handles updating a Hall of fame entry.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const updateHallOfFame = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       try{
              let hof = req.body;
              const imagePath = req.file ? `/uploads/${req.file.filename}` : null;

              if(imagePath !== null){
                     hof = {
                            ...req.body,
                            image: imagePath
                     }
              } 
              const updateHallOfFame = await hofService.updateHallOfFame(req.params.id as string, hof);

              res.status(HTTP_STATUS.OK).json(successResponse(
                     `Hall of Fame updated`,
                     updateHallOfFame
              ));
       } catch (error: unknown) {
              next(error);
       }
};

/**
 * Handles deleting a Hall of fame entry.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const deleteHallOfFame = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       try{
              const deleteHallOfFame = await hofService.deleteHallOfFame(req.params.id as string);

              res.status(HTTP_STATUS.OK).json(successResponse(
                     `Removed Hall of Fame with id: ${deleteHallOfFame}`
              ));
       } catch (error: unknown) {
              next(error);
       }
};
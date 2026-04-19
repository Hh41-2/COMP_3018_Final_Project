import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstant";
import * as teamService from "../services/teamService";
import { Team } from "../models/teamModel"
import { successResponse } from "../models/responseModel";


/**
 * Handles retrieving all teams.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getAllTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       try{
              const getAllTeams: Team[] = await teamService.getAllTeam();
              res.status(HTTP_STATUS.OK).json({
                     message: "Retrieved all teams",
                     totalPlayers: getAllTeams.length,
                     data: getAllTeams 
              });
       } catch (error: unknown) {
              next(error);
       }
};

/**
 * Handles retrieving a team.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const getTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       try{
              const getTeamById: Team | null = await teamService.getTeam(req.params.id as string);
              if(getTeam === null){
                     res.status(HTTP_STATUS.BAD_REQUEST).json({message:"Player not found"});
              } 

              res.status(HTTP_STATUS.OK).json(successResponse(
                     `Retrieved team with id: ${req.params.id}`,
                     getTeamById
              ));
       } catch (error: unknown) {
              next(error);
       }
};

/**
 * Handles creating a new team.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const createTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       try{
              const createTeam: Team = await teamService.createTeam(req.body);

              res.status(HTTP_STATUS.OK).json(successResponse(
                     "Team created",
                     createTeam
              ));
       } catch (error: unknown) {
              next(error);
       }
};

/**
 * Handles updating a team.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const updateTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       try{
              const updateTeam: Team = await teamService.updateTeam(req.params.id as string, req.body);

              res.status(HTTP_STATUS.OK).json(successResponse(
                     "Team updated",
                     updateTeam
              ));
       } catch (error: unknown) {
              next(error);
       }
};

/**
 * Handles deleting a team.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {Promise<void>}
 */
export const deleteTeam = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       try{
              const deleteTeam: string = await teamService.deleteTeam(req.params.id as string);

              res.status(HTTP_STATUS.OK).json(successResponse(
                     `Delete team with id: ${deleteTeam}`
              ));
       } catch (error: unknown) {
              next(error);
       }
};
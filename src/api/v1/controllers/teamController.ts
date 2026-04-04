import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstant";
import * as teamService from "../services/teamService";


export const getAllTeam = (req: Request, res: Response) => {
       res.status(HTTP_STATUS.OK).json({message: teamService.getAllTeam()}
       );
};

export const getTeam = (req: Request, res: Response) => {
       res.status(HTTP_STATUS.OK).json({message: teamService.getTeam()}
       );
};

export const createTeam = (req: Request, res: Response) => {
       res.status(HTTP_STATUS.OK).json({message: teamService.createTeam()}
       );
};

export const updateTeam = (req: Request, res: Response) => {
       res.status(HTTP_STATUS.OK).json({message: teamService.updateTeam()}
       );
};

export const deleteTeam = (req: Request, res: Response) => {
       res.status(HTTP_STATUS.OK).json({message: teamService.deleteTeam()}
       );
};
import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstant";
import * as playerService from "../services/playerService";

export const getAllPlayer = (req: Request, res: Response) => {
       res.status(HTTP_STATUS.OK).json({message: playerService.getAllPlayer()}
       );
};

export const getPlayer = (req: Request, res: Response) => {
       res.status(HTTP_STATUS.OK).json({message: playerService.getPlayer()}
       );
};

export const createPlayer = (req: Request, res: Response) => {
       res.status(HTTP_STATUS.OK).json({message: playerService.createPlayer()}
       );
};

export const updatePlayer = (req: Request, res: Response) => {
       res.status(HTTP_STATUS.OK).json({message: playerService.updatePlayer()}
       );
};

export const deletePlayer = (req: Request, res: Response) => {
       res.status(HTTP_STATUS.OK).json({message: playerService.deletePlayer()}
       );
};
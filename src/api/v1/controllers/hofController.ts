import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstant";
import * as hofService from "../services/hofService"

export const getAllHallOfFame = (req: Request, res: Response) => {
       res.status(HTTP_STATUS.OK).json({message: hofService.getAllHallOfFame()}
       );
};

export const getHallOfFame = (req: Request, res: Response) => {
       res.status(HTTP_STATUS.OK).json({message: hofService.getHallOfFame()}
       );
};

export const createHallOfFame = (req: Request, res: Response) => {
       res.status(HTTP_STATUS.OK).json({message: hofService.createHallOfFame()}
       );
};

export const updateHallOfFame = (req: Request, res: Response) => {
       res.status(HTTP_STATUS.OK).json({message: hofService.updateHallOfFame()}
       );
};

export const deleteHallOfFame = (req: Request, res: Response) => {
       res.status(HTTP_STATUS.OK).json({message: hofService.deleteHallOfFame()}
       );
};
import { Request, Response } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstant";

/*
 * Handles healtch Check.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.  
 * */
export const healthCheck = (req: Request, res: Response) => {
       res.status(HTTP_STATUS.OK).json({
              status: "OK",
              uptime: process.uptime(),
              timestamp: new Date().toISOString(),
              version: "1.0.0",
       });
};
import { Request, Response} from "express";
import { HTTP_STATUS } from "../../../constants/httpConstant";
import { successResponse } from "../models/responseModel";

/*
 * Handles file uploading with multer.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.  
 */
export const fileUpload = (req: Request, res: Response) => {
       if(!req.file) {
              return res.status(HTTP_STATUS.BAD_REQUEST).json(successResponse("No file uploaded"));
       };
       
       res.status(HTTP_STATUS.OK).json(successResponse(
              "File uploaded successfully",
              req.file
       ));
};


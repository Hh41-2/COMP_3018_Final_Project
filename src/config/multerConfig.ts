const multer = require('multer');

export const fileStorage = multer.diskStorage({
       destination: function (
              req: Request,
              file: Express.Multer.File,
              callback: (error: Error | null, destination: string)
              => void) {
                     callback(null, './uploads');
              },

       filename: function (
              req: Request, 
              file: Express.Multer.File, 
              callback: (error: Error | null, filename: string)
              => void) {
                     callback(null, file.originalname);
              }
});
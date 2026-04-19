import {Router} from "express";
import { fileUpload } from "../controllers/multerController";
import { fileStorage } from "../../../config/multerConfig";
const express = require('express');
const multer = require('multer');

// create an multer middleware instance to allow user to upload file
const upload = multer ({ storage : fileStorage});

const router: Router = express.Router();

router.post("/uploads",upload.single('image'), fileUpload);

export default router;
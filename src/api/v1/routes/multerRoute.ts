import {Router} from "express";
import { fileUpload } from "../controllers/multerController";
import { fileStorage } from "../../../config/multerConfig";
const express = require('express');
const multer = require('multer');

const upload = multer ({ storage : fileStorage});

const router: Router = express.Router();

router.post("/uploads",upload.single('file'), fileUpload);

export default router;
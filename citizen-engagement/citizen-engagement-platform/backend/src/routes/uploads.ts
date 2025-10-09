import express from 'express';
import multer from 'multer';
import path from 'path';
import { uploadFile } from '../controllers/uploadController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../../uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

router.post('/', verifyToken, upload.single('file'), uploadFile);

export default router;
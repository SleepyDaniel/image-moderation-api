import express from 'express';
import multer from 'multer';
import { moderateImage } from '../controllers/image.controller';
import { validateImage } from '../middleware/validation.middleware';

const router = express.Router();
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024 
  }
});

router.post(
  '/moderate',
  upload.single('image'),
  validateImage,
  moderateImage
);

export { router as imageRouter };
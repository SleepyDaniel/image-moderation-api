import { Request, Response, NextFunction } from 'express';

export const validateImage = (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp'];
  
  if (!allowedMimeTypes.includes(req.file.mimetype)) {
    return res.status(400).json({ 
      error: 'Invalid file type. Only JPEG, PNG, and WebP images are allowed' 
    });
  }

  next();
};
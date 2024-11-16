import { Request, Response } from 'express';
import { ModerationService } from '../services/moderation.service';
import { logger } from '../utils/logger';
import { validationResult } from 'express-validator';

const moderationService = new ModerationService();

export const moderateImage = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const results = await moderationService.moderateImage(req.file.buffer);
    
    logger.info('Image moderation completed', {
      filename: req.file.originalname,
      results
    });

    return res.status(200).json(results);
  } catch (error) {
    logger.error('Error in image moderation:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
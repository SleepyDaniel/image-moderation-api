import { RekognitionClient, DetectModerationLabelsCommand } from '@aws-sdk/client-rekognition';
import { logger } from '../utils/logger';

export class ModerationService {
  private rekognition: RekognitionClient;

  constructor() {
    this.rekognition = new RekognitionClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
      }
    });
  }

  async moderateImage(imageBuffer: Buffer) {
    try {
      const command = new DetectModerationLabelsCommand({
        Image: {
          Bytes: imageBuffer
        },
        MinConfidence: 60
      });

      const response = await this.rekognition.send(command);
      return this.formatModerationResults(response.ModerationLabels || []);
    } catch (error) {
      logger.error('Error moderating image:', error);
      throw new Error('Failed to moderate image');
    }
  }

  private formatModerationResults(labels: any[]) {
    return {
      isInappropriate: labels.length > 0,
      labels: labels.map(label => ({
        name: label.Name,
        confidence: label.Confidence,
        parentName: label.ParentName
      })),
      timestamp: new Date().toISOString()
    };
  }
}
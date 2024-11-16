# Image Moderation API

Image moderation API using TypeScript, Express, and AWS Rekognition.

This is my old project but still should work. Just uploading it so everyone who need, could use it.

## Features

- Image upload validation and processing
- AWS Rekognition integration for content moderation
- NSFW, violence, and inappropriate content detection
- Rate limiting and error handling
- Logging
- JWT authentication
- Swagger API documentation

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Add your AWS credentials and JWT secret

3. Start the development server:
   ```bash
   npm run dev
   ```

4. API docs available here:
   - http://localhost:3000/api-docs

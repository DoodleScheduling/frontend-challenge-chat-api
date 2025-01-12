# Doodle Frontend Challenge API

Welcome to the Doodle Frontend Challenge! This repository contains a simple chat API that you'll use as the backend for your frontend implementation.

## Overview

As part of the challenge, you'll be building a chat interface that connects to this API. We've provided a containerized backend to ensure you can focus entirely on the frontend implementation without worrying about server side complexities.

### What's Included

This API provides the core functionality you'll need:

- Fetching existing chat messages
- Creating new messages
- Real time message updates

The API comes with:

- Full Swagger documentation for easy exploration
- Built in CORS support for local development
- Error handling and validation
- Docker containerization for consistent behavior

### Getting Started

To begin the challenge:

1. Set up the API by following the installation instructions below
2. Explore the API endpoints using the Swagger documentation
3. Start building your frontend application against this API

## Prerequisites

### Installing Docker

Install Docker for your operating system by following the [official installation guides.](https://docs.docker.com/)

### System Requirements

- At least 4GB of RAM
- Port 3000 must be available
- Internet connection for pulling Docker images

## Running the API

1. Open a terminal/command prompt

2. Build the Docker image:

   ```bash
   npm run docker:build
   ```

3. Run the container:

   ```bash
   npm run docker:run
   ```

4. Verify the API is running by visiting:
   - API Documentation: http://localhost:3000/api/v1/docs
   - Health Check: http://localhost:3000/health

## API Documentation

Once the server is running, you can access the Swagger documentation at:
`http://localhost:3000/api/v1/docs`

### Key Endpoints

#### GET /api/v1/messages

Retrieve chat messages with optional pagination and filtering.

Query Parameters:

- `limit` (optional): Maximum number of messages to return (default: 50)
- `since` (optional): Timestamp to filter messages from

#### POST /api/v1/messages

Create a new chat message.

Request Body:

```json
{
  "message": "Hello world",
  "author": "John Doe"
}
```

#### GET /health

Health check endpoint returning API status.

### Technical Details

- Built with Node.js and Express
- Written in TypeScript
- Uses in memory storage for messages (no database required)
- Includes request validation
- CORS enabled for frontend development
- Error handling
- Docker support for easy deployment

## Additional information

1. The API runs in a container, ensuring consistent behavior across different environments
2. Messages are stored in memory, so data will reset when the container restarts
3. The API includes standard security headers and CORS configuration
4. Swagger documentation provides interactive API testing capabilities

## Local Development (Without Docker)

If you prefer to run the API locally:

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

OR

1. Build for production:

```bash
npm run build
```

2. Start production server:

```bash
npm start
```

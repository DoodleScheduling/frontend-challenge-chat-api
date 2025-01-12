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
- Error handling and validation with detailed logging
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

2. Run the API (this will build the image and start the container):

   ```bash
   npm run docker
   ```

3. Verify the API is running by visiting:
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
- Includes request validation with detailed error logging
- CORS enabled for frontend development
- Error handling with detailed logging

## Additional Information

1. The API runs in a container, ensuring consistent behavior across different environments
2. Messages are stored in memory, so data will reset when the container restarts
3. Swagger documentation provides interactive API testing capabilities

## Local Development (Without Docker)

### Prerequisites

- Node.js 20 or higher

### Setup and Installation

1. Set up environment variables:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

### Running the API

For development (with hot-reload):

```bash
npm run dev
```

The development server will start on http://localhost:3000 with:

- Automatic reloading when files change
- Detailed debugging information
- Enhanced error messages

#### If you prefer to run optimized production build:

1. Build the TypeScript code:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

The production server will run with optimized settings at http://localhost:3000

### Troubleshooting

Docker issues:

- If the container won't start, try:
  ```bash
  docker logs chat-api
  ```
- If you need to stop the container:
  ```bash
  docker stop chat-api
  ```
- If port 3000 is already in use:

  ```bash
  # Check what's using the port

  # Unix/Mac
  lsof -i :3000

  # Windows
  netstat -ano | findstr :3000  # On Windows

  # Then either:
  # 1. Stop the conflicting process, or
  # 2. Change the port mapping in the docker run command to use a different port
  ```

Local development issues:

- If you have dependency issues:

  ```bash
  npm clean-install
  ```

- If TypeScript build fails:

  ```bash
  # Unix/Mac
  rm -rf dist/
  npm run build

  # Windows
  rd /s /q dist
  npm run build
  ```

- If the development server crashes:

  ```bash
  # Clear node_modules and reinstall

  # Unix/Mac
  rm -rf node_modules/
  npm install

  # Windows
  rd /s /q node_modules
  npm install
  ```

## License

Copyright (c) 2024 Doodle AG. All rights reserved.

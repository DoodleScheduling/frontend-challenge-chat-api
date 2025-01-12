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

## Option 1: Running with Docker (Recommended)

### Prerequisites

#### Installing Docker

Install Docker for your operating system by following the [official installation guides](https://docs.docker.com/).

#### System Requirements

- At least 4GB of RAM
- Port 3000 must be available
- Internet connection for pulling Docker images

### Running the API with Docker

1. Open a terminal/command prompt

2. Start the API:
   ```bash
   docker compose up
   ```

   To rebuild the container:
   ```bash
   docker compose up --build
   ```

   To stop and remove containers:
   ```bash
   docker compose down
   ```

   To clean up completely (remove containers, images, and volumes):
   ```bash
   docker compose down --rmi local -v
   ```

## Option 2: Local Development (Without Docker)

### Prerequisites

Install Node.js 20 or higher by downloading it from https://nodejs.org.

### Setup and Installation

Set up environment variables:
```bash
# Unix/Mac
cp .env.example .env
# Windows
copy .env.example .env
```

Install dependencies:
```bash
npm install
```

### Running the API Locally

For development (with hot-reload):
```bash
npm run dev
```

For production build:
```bash
npm run build
npm start
```

The server will start on http://localhost:3000

## Verifying the API

After starting the API (either with Docker or locally), verify it's running by visiting:
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
  "message": "Grüezi mitenand",
  "author": "Hans Müller"
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

## Additional Information

1. The API runs in a container or locally, ensuring flexibility for different development preferences
2. Messages are stored in memory, so data will reset when the server restarts
3. Swagger documentation provides interactive API testing capabilities

### Troubleshooting

#### Docker Issues:

If the container won't start:
```bash
docker compose logs
```

If port 3000 is already in use:
```bash
# Check what's using the port
# Unix/Mac
lsof -i :3000
# Windows
netstat -ano | findstr :3000

# Then either:
# 1. Stop the conflicting process, or
# 2. Change the port in docker-compose.yml to use a different port
```

#### Local Development Issues:

If you have dependency issues:
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

If TypeScript build fails:
```bash
rm -rf dist
npm run build
```

## License

Copyright (c) 2024 Doodle AG. All rights reserved.

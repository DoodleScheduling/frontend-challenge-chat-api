import { createApp } from './app';
import { CONFIG } from './config';

const { port } = CONFIG;
const app = createApp();

const logStartupInfo = () => {
  console.log('🚀 Server started successfully');
  console.log(`📡 Server running on port ${port}`);
  console.log(
    `📚 API Documentation: http://localhost:${port}${CONFIG.api.route}/docs`
  );
  console.log(`💚 Health check: http://localhost:${port}/health`);
};

const handleGracefulShutdown = () => {
  console.log('🛑 Received SIGTERM signal. Shutting down gracefully...');
  server.close(() => {
    console.log('💤 Server shut down successfully');
    process.exit(0);
  });
};

const server = app.listen(port, logStartupInfo);

process.on('SIGTERM', handleGracefulShutdown);

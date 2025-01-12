import { createApp } from './app';
import { CONFIG } from './config';
import { API_ROUTE } from './constants';

const { port } = CONFIG;

const app = createApp();

const server = app.listen(port, () => {
  console.log('🚀 Server started successfully');
  console.log(`📡 Server running on port ${port}`);
  console.log(
    `📚 API Documentation: http://localhost:${port}${API_ROUTE}/docs`
  );
  console.log(`💚 Health check: http://localhost:${port}/health`);
});

process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM signal. Shutting down gracefully...');
  server.close(() => {
    console.log('💤 Server shut down successfully');
    process.exit(0);
  });
});

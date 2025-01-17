import { createApp } from './app';
import { CONFIG } from './config';
import { connectDB } from './db';
import { setupGracefulShutdown } from './server/shutdown';

const startServer = async () => {
  const app = createApp();

  try {
    await connectDB();

    const server = app.listen(CONFIG.port, () => {
      console.log('🚀 Server started successfully');
      console.log(`📡 Server running on port ${CONFIG.port.toString()}`);
      console.log(
        `📚 API Documentation: http://localhost:${CONFIG.port.toString()}${CONFIG.api.route}/docs`
      );
      console.log(
        `💚 Health check: http://localhost:${CONFIG.port.toString()}/health`
      );
    });

    setupGracefulShutdown(server);

    return server;
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

void (async () => {
  await startServer();
})();

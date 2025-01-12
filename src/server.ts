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

const handleGracefulShutdown = (signal: string) => {
  console.log(`\n🛑 Received ${signal} signal. Shutting down gracefully...`);

  // Add a timeout to force exit if graceful shutdown takes too long
  const forceShutdownTimeout = setTimeout(() => {
    console.log(
      '\u26A0\uFE0F Server failed to close in time, forcing shutdown'
    );
    process.exit(1);
  }, 5000);

  server.close(() => {
    clearTimeout(forceShutdownTimeout);
    console.log('💤 Server shut down successfully');
    process.exit(0);
  });
};

const server = app.listen(port, logStartupInfo);

['SIGTERM', 'SIGINT'].forEach((signal) => {
  process.on(signal, () => handleGracefulShutdown(signal));
});

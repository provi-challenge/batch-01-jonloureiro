import cors from 'cors';
import express from 'express';
import http from 'http';
import throng from 'throng';
import { setupRoutes } from './setupRoutes.js';

const { NODE_ENV, PORT, WEB_CONCURRENCY } = process.env;
const WORKERS = WEB_CONCURRENCY || 1;
const port = PORT || 5001;

const worker = (id, disconnect) => {
  console.log(`Started worker ${id}`);
  process.on('SIGTERM', () => {
    console.log(`Worker ${id} exiting (cleanup here)`);
    disconnect();
  });

  const app = express();
  const server = http.createServer(app);

  app.use(cors({ origin: '*' }));
  app.use(express.json({}));
  app.use(express.urlencoded({ extended: true }));

  setupRoutes(app);

  server.listen(port, () => {
    console.log(`We are live on ${port}`);
    console.log(`Environment: ${NODE_ENV}`);
  });
};

throng({ worker, count: WORKERS }).catch(e =>
  console.error(`Error starting "back"`, e)
);

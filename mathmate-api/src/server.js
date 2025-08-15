import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config();

const PORT = process.env.PORT || 4000;
const isProd = process.env.NODE_ENV === 'production';

const app = express();

// app.use(helmet());
// app.use(cors({ origin: '*' })); // restrict in prod later
app.use(express.json());
app.use(morgan(isProd ? 'combined' : 'dev'));

app.get('/', (_req, res) => res.json({ ok: true }));

import solutionRoute from './routes/solution.route.js';

app.use('/api/solutions', solutionRoute);

/* ----------  Central 404 handler ---------- */
app.use((_req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

/* ----------  Central error handler ---------- */
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const server = app.listen(PORT, () =>
  console.log(
    `API listening on http://localhost:${PORT} (${process.env.NODE_ENV})`
  )
);

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

function shutdown() {
  console.log('\nShutting down gracefully...');
  server.close(() => process.exit(0));
}

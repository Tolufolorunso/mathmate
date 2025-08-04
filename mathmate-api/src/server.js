import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());

app.get('/', (_req, res) => res.json({ ok: true }));

app.listen(4000, () => console.log('API on http://localhost:4000'));

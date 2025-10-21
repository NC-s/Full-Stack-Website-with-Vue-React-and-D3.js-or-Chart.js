import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());

app.get('/api/metrics', (_req, res) => {
  const dataPath = path.join(__dirname, 'data', 'metrics.json');

  fs.readFile(dataPath, 'utf8', (err, file) => {
    if (err) {
      res.status(500).json({ message: 'Unable to read metrics file', error: err.message });
      return;
    }

    try {
      const payload = JSON.parse(file);
      res.json({ ...payload, timestamp: new Date().toISOString() });
    } catch (parseError) {
      res.status(500).json({ message: 'Invalid metrics payload', error: parseError instanceof Error ? parseError.message : 'Unknown error' });
    }
  });
});

app.listen(port, () => {
  console.log(`Metrics API listening on http://localhost:${port}`);
});

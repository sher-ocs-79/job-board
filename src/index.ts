// src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { postJob, getJobs } from './controllers/JobController';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Routes
app.post('/jobs', postJob);
app.get('/jobs', getJobs);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

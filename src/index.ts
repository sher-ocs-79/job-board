import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config();

import { postJob, getJobs, getJobById, approveJob, markJobAsSpam } from './controllers/JobController';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/jobs', postJob);
app.get('/jobs', getJobs);
app.get('/jobs/:jobId', getJobById);
app.get('/jobs/approve/:email', approveJob);
app.get('/jobs/mark-spam/:email', markJobAsSpam);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
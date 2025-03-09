import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { postJob, getJobs, approveJob, markJobAsSpam } from './controllers/JobController';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/jobs', postJob);
app.get('/jobs', getJobs);
app.post('/jobs/approve/:email', approveJob);
app.post('/jobs/mark-spam/:email', markJobAsSpam);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
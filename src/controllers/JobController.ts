import { Request, Response } from 'express';
import { Job } from '../models/Job';
import { sendNotification } from '../services/NotificationService';
import { fetchExternalJobs } from '../services/ExternalJobService';
import { validateEmail } from '../utils/helper';

let jobs: Job[] = [];

export const postJob = async (req: Request, res: Response): Promise<void> => {
  const { title, description, email } = req.body;

  if (!validateEmail(email)) {
    res.status(400).json({ error: 'Invalid email address.' });
    return;
  }

  const isFirstTimePoster = !jobs.some((job) => job.email === email);

  const newJob: Job = {
    id: Date.now().toString(),
    title,
    description,
    email,
    isApproved: false,
    isSpam: false,
    createdAt: new Date(),
  };

  jobs.push(newJob);

  if (isFirstTimePoster) {
    await sendNotification(newJob);
  }

  res.status(201).json({ message: 'Job posted successfully', job: newJob });
};

export const getJobs = async (req: Request, res: Response): Promise<void> => {
  const externalJobs = await fetchExternalJobs();
  const localJobs = jobs.filter((job) => job.isApproved && !job.isSpam);

  const combinedJobs = [...localJobs, ...externalJobs];
  res.status(200).json(combinedJobs);
};

export const approveJob = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.params;

  const job = jobs.find((job) => job.email === email);

  if (!job) {
    res.status(404).json({ error: 'Job not found.' });
    return;
  }

  job.isApproved = true;
  res.status(200).json({ message: 'Job approved successfully.', job });
};

export const markJobAsSpam = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.params;

  const job = jobs.find((job) => job.email === email);

  if (!job) {
    res.status(404).json({ error: 'Job not found.' });
    return;
  }

  job.isSpam = true;
  res.status(200).json({ message: 'Job marked as spam successfully.', job });
};
import { Request, Response } from 'express';
import { Job } from '../models/Job';
import { sendNotification } from '../services/NotificationService';

let jobs: Job[] = [];

export const postJob = async (req: Request, res: Response) => {
  const { title, description, email } = req.body;

  // Check if the email has been used before
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

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password',
  },
});

export const sendNotification = async (job: { title: string; description: string; email: string }) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to: 'moderator-email@gmail.com',
    subject: 'New Job Posting Notification',
    html: `
      <h1>New Job Posting</h1>
      <p><strong>Title:</strong> ${job.title}</p>
      <p><strong>Description:</strong> ${job.description}</p>
      <p><strong>Posted by:</strong> ${job.email}</p>
      <p>
        <a href="http://your-job-board.com/approve/${job.email}">Approve</a> |
        <a href="http://your-job-board.com/mark-spam/${job.email}">Mark as Spam</a>
      </p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

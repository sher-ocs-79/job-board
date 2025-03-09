import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: parseInt(process.env.MAILTRAP_PORT || '2525', 10),
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

export const sendNotification = async (job: { title: string; description: string; email: string }) => {  
  const mailOptions = {
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    subject: 'New Job Posting Notification',
    html: `
      <h1>New Job Posting</h1>
      <p><strong>Title:</strong> ${job.title}</p>
      <p><strong>Description:</strong> ${job.description}</p>
      <p><strong>Posted by:</strong> ${job.email}</p>
      <p>
        <a href="${process.env.API_HOST}/approve/${job.email}">Approve</a> |
        <a href="${process.env.API_HOST}/mark-spam/${job.email}">Mark as Spam</a>
      </p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Notification email sent successfully.');
  } catch (error) {
    console.error('Error sending notification email:', error);
    throw new Error('Failed to send notification email.');
  }
};
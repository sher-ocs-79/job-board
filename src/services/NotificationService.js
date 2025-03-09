"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
    },
});
const sendNotification = (job) => __awaiter(void 0, void 0, void 0, function* () {
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
    yield transporter.sendMail(mailOptions);
});
exports.sendNotification = sendNotification;

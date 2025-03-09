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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJobs = exports.postJob = void 0;
const NotificationService_1 = require("../services/NotificationService");
const ExternalJobService_1 = require("../services/ExternalJobService");
let jobs = [];
const postJob = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, email } = req.body;
    // Check if the email has been used before
    const isFirstTimePoster = !jobs.some((job) => job.email === email);
    const newJob = {
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
        yield (0, NotificationService_1.sendNotification)(newJob);
    }
    res.status(201).json({ message: 'Job posted successfully', job: newJob });
});
exports.postJob = postJob;
const getJobs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const externalJobs = yield (0, ExternalJobService_1.fetchExternalJobs)();
    const localJobs = jobs.filter((job) => job.isApproved && !job.isSpam);
    const combinedJobs = [...localJobs, ...externalJobs];
    res.status(200).json(combinedJobs);
});
exports.getJobs = getJobs;

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
exports.fetchExternalJobs = void 0;
const axios_1 = __importDefault(require("axios"));
const fetchExternalJobs = () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get('https://mrge-group-gmbh.jobs.personio.de/xml');
    // Parse XML response (you may need an XML parser like `xml2js`)
    const jobs = response.data; // Replace with actual parsing logic
    return jobs.map((job) => ({
        title: job.title,
        description: job.description,
        link: job.link,
    }));
});
exports.fetchExternalJobs = fetchExternalJobs;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const JobController_1 = require("./controllers/JobController");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Routes
app.post('/jobs', JobController_1.postJob);
app.get('/jobs', JobController_1.getJobs);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

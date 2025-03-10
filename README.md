# Job Board Backend Project

This is a backend application for a job board platform. It allows users to post job listings, fetches external job listings from an API, and notifies moderators when a new job is posted. The project is built using **Node.js**, **TypeScript**, and **Express**.

---

## **Features**
1. **Post a Job**:
   - Users can post job listings by providing a title, description, and email.
   - Moderators are notified via email when a job is posted for the first time by a specific email address.

2. **Fetch External Job Listings**:
   - The application fetches job listings from an external API and combines them with locally posted jobs.

3. **Approve or Mark as Spam**:
   - Moderators can approve or mark job postings as spam via email links.

4. **Email Notifications**:
   - Notifications are sent using **Mailtrap** (for development) or any other SMTP service.

---

## **Technologies Used**
- **Node.js**: Runtime environment.
- **TypeScript**: Programming language.
- **Express**: Web framework.
- **Nodemailer**: For sending email notifications.
- **Axios**: For making HTTP requests to the external API.
- **xml2js**: For parsing XML responses.
- **dotenv**: For managing environment variables.

---

## **Prerequisites**
Before running the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)

---

## **Setup Instructions**

### **1. Clone the Repository**
Clone the project repository to your local machine:
```bash
git clone https://github.com/your-username/job-board-backend.git
cd job-board-backend
```
### **2. Install Dependencies**
Install the required dependencies:
```bash
npm install
```
### **3. Set Up Environment Variables**
Create a `.env` file in the root of the project and add the following variables:
```bash
# Mailtrap SMTP Configuration
MAILTRAP_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_PORT=2525
MAILTRAP_USER=your-mailtrap-username
MAILTRAP_PASS=your-mailtrap-password

# External Job Board API
EXTERNAL_JOB_BOARD_API=https://mrge-group-gmbh.jobs.personio.de/xml

# Application Settings
NODE_ENV=development
PORT=3000
```
Replace `your-mailtrap-username` and `your-mailtrap-password` with your actual Mailtrap credentials.
### **4. Compile TypeScript**
Compile the TypeScript code to JavaScript:
```bash
npx tsc
```
### **5. Run the Application**
Start the server:
```bash
npm start
```
For development with hot-reloading, use:
```bash
npm run dev
```
The server will start at `http://localhost:3000`:

---
## **API Endpoints**
### **1. Post a Job**
- **Endpoint:** `POST /jobs`
- **Request Body:**
```bash
{
  "title": "Software Engineer",
  "description": "We are looking for a skilled software engineer...",
  "email": "user@example.com"
}
```
- **Response:**
```bash
{
  "message": "Job posted successfully",
  "job": {
    "id": "12345",
    "title": "Software Engineer",
    "description": "We are looking for a skilled software engineer...",
    "email": "user@example.com",
    "isApproved": false,
    "isSpam": false,
    "createdAt": "2023-10-15T12:00:00.000Z"
  }
}
```
### **2. Get All Job Listings**
- **Endpoint:** `GET /jobs`
- **Response:**
```bash
[
  {
    "title": "Software Engineer",
    "description": "We are looking for a skilled software engineer...",
    "link": "https://example.com/job/123"
  },
  {
    "title": "Data Scientist",
    "description": "We are looking for a data scientist...",
    "link": "https://example.com/job/456"
  }
]
```
### **3. Approve a Job**
- **Endpoint:** `POST /jobs/approve/:email`
- **Response:**
```bash
{
  "message": "Job approved successfully."
}
```
### **4. Mark a Job as Spam**
- **Endpoint:** `POST /jobs/mark-spam/:email`
- **Response:**
```bash
{
  "message": "Job marked as spam successfully."
}
```

---
## **Testing the Application**
### **1. Post a Job**
Use Postman or curl to post a job:
```bash
curl -X POST http://localhost:3000/jobs \
-H "Content-Type: application/json" \
-d '{
  "title": "Software Engineer",
  "description": "We are looking for a skilled software engineer...",
  "email": "user@example.com"
}'
```
### **2. Fetch Job Listings**
Fetch all job listings:
```bash
curl -X GET http://localhost:3000/jobs
```
### **3. Approve or Mark as Spam**
Approve or mark a job as spam using the email links in the notification email or by sending a request directly:
```bash
curl -X POST http://localhost:3000/jobs/approve/user@example.com
curl -X POST http://localhost:3000/jobs/mark-spam/user@example.com
```

---
## **Project Structure**
```bash
job-board/
├── src/
│   ├── controllers/        # Route handlers
│   ├── models/             # Data models
│   ├── services/           # Business logic
│   ├── utils/              # Utility functions
│   └── index.ts            # Entry point
├── .env                    # Environment variables
├── .gitignore              # Files to ignore in Git
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation
```

---
## **Contributing**
Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to the branch.
4. Submit a pull request.

---
## **License**
This project is licensed under the MIT License. See the <a href="https://license/" target="_blank">LICENSE</a> file for details.

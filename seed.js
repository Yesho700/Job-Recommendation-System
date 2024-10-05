const mongoose = require('mongoose');
const dotenv = require('dotenv');
const JobPosting = require('./models/JobPosting');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const jobPostings = [
    {
        job_title: "Software Engineer",
        company: "Tech Solutions Inc.",
        required_skills: ["JavaScript", "React", "Node.js"],
        location: "San Francisco",
        job_type: "Full-Time",
        experience_level: "Intermediate",
    },
    {
        job_title: "Data Scientist",
        company: "Data Analytics Corp.",
        required_skills: ["Python", "Data Analysis", "Machine Learning"],
        location: "Remote",
        job_type: "Full-Time",
        experience_level: "Intermediate",
    },
    {
        job_title: "Frontend Developer",
        company: "Creative Designs LLC",
        required_skills: ["HTML", "CSS", "JavaScript", "Vue.js"],
        location: "New York",
        job_type: "Part-Time",
        experience_level: "Junior",
    },
    {
        job_title: "Backend Developer",
        company: "Web Services Co.",
        required_skills: ["Python", "Django", "REST APIs"],
        location: "Chicago",
        job_type: "Full-Time",
        experience_level: "Senior",
    },
    {
        job_title: "Machine Learning Engineer",
        company: "AI Innovations",
        required_skills: ["Python", "Machine Learning", "TensorFlow"],
        location: "Boston",
        job_type: "Full-Time",
        experience_level: "Intermediate",
    },
    {
        job_title: "DevOps Engineer",
        company: "Cloud Networks",
        required_skills: ["AWS", "Docker", "Kubernetes"],
        location: "Seattle",
        job_type: "Full-Time",
        experience_level: "Senior",
    },
    {
        job_title: "Full Stack Developer",
        company: "Startup Hub",
        required_skills: ["JavaScript", "Node.js", "Angular", "MongoDB"],
        location: "Austin",
        job_type: "Full-Time",
        experience_level: "Intermediate",
    },
    {
        job_title: "Data Analyst",
        company: "Finance Analytics",
        required_skills: ["SQL", "Python", "Tableau"],
        location: "New York",
        job_type: "Full-Time",
        experience_level: "Junior",
    },
    {
        job_title: "Quality Assurance Engineer",
        company: "Reliable Software",
        required_skills: ["Selenium", "Java", "Testing"],
        location: "San Francisco",
        job_type: "Contract",
        experience_level: "Intermediate",
    },
    {
        job_title: "Systems Administrator",
        company: "Enterprise Solutions",
        required_skills: ["Linux", "Networking", "Shell Scripting"],
        location: "Remote",
        job_type: "Full-Time",
        experience_level: "Senior",
    },
];

const seedDB = async () => {
    await JobPosting.deleteMany({});
    await JobPosting.insertMany(jobPostings);
    console.log('Mock job postings inserted.');
    mongoose.connection.close();
};

seedDB();

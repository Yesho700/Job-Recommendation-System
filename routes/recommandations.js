const express = require('express');
const JobPosting = require('../models/JobPosting');

const router = express.Router();

router.post('/recommand', async (req, res) => {
    const userProfile = req.body;

    if (!userProfile) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    const userSkills = new Set(userProfile.skills);
    const userExperience = userProfile.experience_level;
    const userPreferences = userProfile.preferences;

    try {
        const jobPostings = await JobPosting.find({});
        const recommendedJobs = [];

        for (const job of jobPostings) {
            let points = 0;

    
            const jobSkills = new Set(job.required_skills);
            const skillMatch = [...userSkills].filter(skill => jobSkills.has(skill)).length;
            points += skillMatch;

            if (job.experience_level === userExperience) {
                points += 1;
            }

            if (userPreferences.locations.includes(job.location)) {
                points += 1;
            }

            if (job.job_type === userPreferences.job_type) {
                points += 1;
            }

            if (points > 0) {
                recommendedJobs.push({ ...job.toObject(), points });
            }
        }


        recommendedJobs.sort((job1, job2) => job2.score - job1.score);

        return res.json(recommendedJobs);
    } catch (error) {
        return res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;

const express = require('express');
const User = require('../models/User');

const router = express.Router();


router.post('/user', async (req, res) => {
    const userProfile = req.body;

    if (!userProfile.name || !userProfile.skills || !userProfile.experience_level || !userProfile.preferences) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const newUser = new User(userProfile);
        await newUser.save();
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: 'Error saving user profile' });
    }
});

module.exports = router;

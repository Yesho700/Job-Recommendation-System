const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const recommandationsRoutes = require('./routes/recommandations');
const userRoutes = require('./routes/user');

dotenv.config();

const app = express();
app.use(express.static('public'));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', recommandationsRoutes);
app.use('/api', userRoutes);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, () => {
  console.log('Connected to DB');
});

// Routes
app.use('/api/auth', authRoutes);

// Protected route
app.get('/api/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

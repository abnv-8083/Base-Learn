const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

const path = require('path');

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded videos
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Placeholder routes — to be implemented per role
app.use('/api/student', require('./routes/studentRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/faculty', require('./routes/facultyRoutes'));
app.use('/api/instructor', require('./routes/instructorRoutes'));

// Health check
app.get('/', (req, res) => res.json({ message: '🎓 Base Learn API is running' }));

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Trigger nodemon restart

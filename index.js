const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const useRoute = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173', // Local React dev server
  'https://expense-tracker-frontend.vercel.app', // Vercel frontend
  'https://www.expensetrackerfrontend.tech' // Custom domain
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Routes
app.use('/api', useRoute);

// Root route for health check
app.get('/', (req, res) => {
  res.send("🚀 Expense Tracker Backend is live!");
});

// Server setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

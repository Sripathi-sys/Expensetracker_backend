const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

// ✅ Connect to MongoDB
connectDB();

// ✅ Define allowed origins for CORS
const allowedOrigins = [
  'http://localhost:5173', // Local React dev server
  'https://expensetracker-frontend.vercel.app' // Deployed frontend
];

// ✅ CORS middleware
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ JSON parser middleware
app.use(express.json());

// ✅ API routes
app.use('/api', userRoutes);

// ✅ Optional root route
// app.get('/', (req, res) => {
//   res.send("Hello Vanakam Express");
// });

// ✅ Server setup
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});



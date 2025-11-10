// backend/server.js

const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const socketIo = require('socket.io');
const path = require('path');

dotenv.config(); // loads .env variables

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

// Middlewares
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/Authroutes');
const foodRoutes = require('./routes/Foodroutes');
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);

// Connect to MongoDB
const connectDB = require('./config/Db');
connectDB();

// Socket.io setup for real-time updates
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


// Make io available globally (optional)
app.set('io', io);

// Server start
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

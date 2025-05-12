import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import noteRoutes from './routes/noteRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
import authRoutes from './routes/authRoutes.js';
// import { ai } from './ai/genkit.js'; // Initialize Genkit if needed for backend flows

dotenv.config();

connectDB();

const app = express();

app.use(cors()); // Configure CORS appropriately for production
app.use(express.json());

// Initialize Genkit development UI if in dev - this may need adjustment based on how genkit is used
// if (process.env.GENKIT_ENV === 'dev') {
//   const { GenkitDevUI } = await import('@genkit-ai/dev-ui');
//   app.use('/dev', GenkitDevUI());
// }


app.get('/', (req, res) => {
  res.send('ZenithHub API Running');
});

// API Routes
app.use('/api/notes', noteRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
// Add other routes (chat, blog content, etc.) here

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));

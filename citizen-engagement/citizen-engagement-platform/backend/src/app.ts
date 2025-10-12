import express from 'express';
import mongoose from 'mongoose';
import setRoutes from './routes/projectRoutes';
import authRoutes from './routes/authRoutes';
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 10000; // use Render's assigned port if available
const MONGO_URI = process.env.MONGO_URI as string;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);

// MongoDB connection
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error);
  });

// Routes
setRoutes(app);

app.get("/", (_req, res) => {
  res.json({ message: "Citizen Engagement API is running 🚀" });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Server is running on port ${PORT}`);
});


function then(arg0: () => void) {
  throw new Error('Function not implemented.');
}

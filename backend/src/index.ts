import express from 'express';
import authRoutes from './routes/auth';

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

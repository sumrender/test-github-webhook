import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Google Auth callback endpoint
app.post('/auth/google', (req, res) => {
  console.log('Received Google authentication data:', req.body);
  res.status(200).json({ message: 'Authentication data received' });
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const OpenAI = require('openai');

const questionHandler = require('./routes/question');
const scoreHandler = require('./routes/score');
const saveQuizSessionHandler = require('./routes/save-quiz-session');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

// MongoDB Connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
let db;

// OpenAI Configuration
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Connect to MongoDB
async function connectToMongo() {
  try {
    await client.connect();
    db = client.db('quiz-app');
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
  }
}

// Rutas API
app.post('/api/question', questionHandler);
app.post('/api/score', scoreHandler);
app.post('/api/save-quiz-session', saveQuizSessionHandler);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Quiz de Categorías funcionando correctamente' });
});

// Iniciar el servidor
connectToMongo().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
  });
});

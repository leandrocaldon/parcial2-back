const { MongoClient } = require('mongodb');

const saveQuizSessionHandler = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sólo se permite POST' });
  }
  
  const { user, category, questions, results, totalScore } = req.body;
  
  if (!user || !category || !questions || !results || totalScore === undefined) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();
    
    // Guardar la sesión completa
    const sessionResult = await db.collection('quiz_sessions').insertOne({
      user,
      category,
      questions,
      results,
      totalScore,
      totalQuestions: questions.length,
      timestamp: new Date()
    });
    
    await client.close();
    
    res.status(200).json({ 
      success: true, 
      sessionId: sessionResult.insertedId,
      message: 'Sesión de quiz guardada correctamente'
    });
  } catch (error) {
    console.error('Error al guardar sesión:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = saveQuizSessionHandler;

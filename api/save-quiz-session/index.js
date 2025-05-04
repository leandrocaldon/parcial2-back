const { getCollection } = require('../../utils/mongodb');

module.exports = async (req, res) => {
  // Configuración de CORS para Vercel
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', 'https://parcial2-front-roan.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  // Manejar solicitudes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Sólo se permite POST' });
  }
  
  const { user, category, questions, results, totalScore } = req.body;
  
  if (!user || !category || !questions || !results || totalScore === undefined) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  try {
    // Obtener la colección de sesiones de quiz
    const sessionsCollection = await getCollection('quiz_sessions');
    
    // Guardar la sesión completa
    const sessionResult = await sessionsCollection.insertOne({
      user,
      category,
      questions,
      results,
      totalScore,
      totalQuestions: questions.length,
      timestamp: new Date()
    });
    
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

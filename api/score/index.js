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
  
  const { user, category, question, options, selected, correct } = req.body;
  if (!user || !category || !question || !selected || !correct) {
    return res.status(400).json({ error: 'Faltan datos' });
  }
  
  const isCorrect = selected === correct;
  const score = isCorrect ? 1 : 0;

  try {
    // Obtener la colección scores
    const scoresCollection = await getCollection('scores');
    
    // Insertar el resultado
    await scoresCollection.insertOne({
      user,
      category,
      question,
      options,
      selected,
      correct,
      score,
      isCorrect,
      timestamp: new Date()
    });
    
    res.status(200).json({ score, isCorrect });
  } catch (error) {
    console.error('Error en /api/score:', error);
    res.status(500).json({ error: error.message });
  }
};

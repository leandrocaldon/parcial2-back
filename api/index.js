module.exports = (req, res) => {
  // Configuración de CORS para Vercel
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  // Manejar solicitudes OPTIONS (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  res.status(200).json({ 
    message: 'API de Quiz de Categorías funcionando correctamente',
    endpoints: [
      '/api/question - Genera preguntas para una categoría',
      '/api/score - Evalúa una respuesta y guarda el resultado',
      '/api/save-quiz-session - Guarda una sesión completa de quiz'
    ],
    version: '1.0.0'
  });
};

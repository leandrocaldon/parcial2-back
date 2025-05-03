const { MongoClient } = require('mongodb');

const scoreHandler = async (req, res) => {
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
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    const db = client.db();
    await db.collection('scores').insertOne({
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
    await client.close();
    res.status(200).json({ score, isCorrect });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = scoreHandler;

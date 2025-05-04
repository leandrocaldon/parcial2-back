const { MongoClient } = require('mongodb');

// Creamos una conexión reutilizable para el entorno serverless
const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

// En desarrollo, usamos una variable global para mantener la conexión entre reinicios
if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En producción, es mejor crear una nueva conexión por cada invocación
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

// Función para obtener una conexión a MongoDB
async function getMongoClient() {
  return await clientPromise;
}

// Función para obtener una colección específica
async function getCollection(collectionName) {
  const client = await clientPromise;
  const db = client.db();
  return db.collection(collectionName);
}

module.exports = { getMongoClient, getCollection };

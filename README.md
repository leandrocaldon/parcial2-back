# Backend - Quiz de Categorías

Este es el backend de la aplicación Quiz de Categorías, desarrollado con Express.js y MongoDB.

## Características

- API REST para generación de preguntas con OpenAI
- Almacenamiento de resultados y sesiones en MongoDB
- Manejo de autenticación y variables de entorno

## Requisitos

- Node.js 14.x o superior
- npm o yarn
- Cuenta en MongoDB Atlas (o MongoDB local)
- Clave API de OpenAI

## Instalación

1. Instala las dependencias:
   ```
   npm install
   ```

2. Crea un archivo `.env` basado en `.env.example`:
   ```
   cp .env.example .env
   ```

3. Edita el archivo `.env` con tus credenciales:
   ```
   PORT=5000
   MONGODB_URI=mongodb+srv://tu-usuario:tu-password@tu-cluster.mongodb.net/quiz-app
   OPENAI_API_KEY=sk-tu-clave-api-openai
   FRONTEND_URL=http://localhost:3000
   ```

## Ejecución

Para ejecutar en modo desarrollo:
```
npm run dev
```

El servidor estará disponible en [http://localhost:5000](http://localhost:5000)

## Endpoints API

- `POST /api/question`: Genera preguntas para una categoría
  - Body: `{ "category": "historia" }`

- `POST /api/score`: Evalúa una respuesta y guarda el resultado
  - Body: `{ "user": "nombre", "category": "historia", "question": "pregunta", "options": ["op1", "op2", "op3", "op4"], "selected": "A", "correct": "B" }`

- `POST /api/save-quiz-session`: Guarda una sesión completa de quiz
  - Body: `{ "user": "nombre", "category": "historia", "questions": [...], "results": [...], "totalScore": 3 }`

## Despliegue

El backend puede desplegarse en servicios como:
- Heroku
- Railway
- Render
- DigitalOcean App Platform

Asegúrate de configurar las variables de entorno en el servicio de despliegue.

## Estructura de archivos

- `server.js`: Punto de entrada de la aplicación
- `routes/`: Controladores para cada endpoint
- `mongodb.js`: Configuración de conexión a MongoDB

## Solución de problemas

Si encuentras errores:
1. Verifica que las variables de entorno estén correctamente configuradas
2. Asegúrate de que la conexión a MongoDB sea válida
3. Verifica que la clave API de OpenAI tenga saldo disponible

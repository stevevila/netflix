const express = require('express');
const { httpMiddleware, exposeMetrics } = require('./metrics');
const promClient = require('prom-client');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware pour les métriques HTTP
app.use(httpMiddleware);

// Route pour les métriques Prometheus
app.get('/metrics', exposeMetrics);

// Route d'accueil
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

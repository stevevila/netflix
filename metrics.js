const promClient = require('prom-client');

// Créer un compteur pour les requêtes HTTP
const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
});

// Middleware pour incrémenter le compteur pour chaque requête HTTP
const httpMiddleware = (req, res, next) => {
  httpRequestCounter.inc();
  next();
};

// Exposer les métriques via une route /metrics
const exposeMetrics = (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(promClient.register.metrics());
};

module.exports = { httpMiddleware, exposeMetrics };

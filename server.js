const express = require('express');
const https = require('https');
const fs = require('fs');
const promClient = require('prom-client');

const app = express();
const PORT = process.env.PORT || 443;

const httpRequestCounter = new promClient.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
});

app.get('/', (req, res) => {
  httpRequestCounter.inc();
  res.send('Hello World!');
});

app.get('/metrics', async (req, res) => {
  try {
    res.set('Content-Type', promClient.register.contentType);
    const metrics = promClient.register.metrics();
    res.end(metrics);
  } catch (err) {
    console.error('Error generating metrics:', err);
    res.status(500).send('Internal Server Error');
  }
});

https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

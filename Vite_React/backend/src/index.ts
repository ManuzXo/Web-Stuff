import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import Routing from './Routing';
import RouterManager from './Routing';

// Carica il file .env
dotenv.config({ path: path.resolve(__dirname, '../config.env') });

const app = express();
const host = process.env.HOST || 'localhost';
const port = Number(process.env.PORT) || 3000;

app.use(express.static(path.resolve(__dirname, process.env.FRONTEND_DIST || ''))); // Serve i file statici (JS, CSS, immagini)
app.use(express.json()); // Middleware per il parsing del JSON

const routeManager = new RouterManager(app); // Crea un'istanza di RouterManager
routeManager.initialize().then(() => { // Inizializza i controller

  // Invia il file index.html come risposta alla root
  app.get(/(.*)/, (req, res, next) => {

    if (req.path.startsWith("/api")) {
      return next();
    }

    const frontendDist = process.env.FRONTEND_DIST;
    if (!frontendDist) {
      res.status(500).send('FRONTEND_DIST is not defined in the environment variables.');
      return;
    }

    const absolutePath = path.resolve(__dirname, frontendDist, 'index.html');
    res.sendFile(absolutePath, (err) => {
      if (err) {
        res.status(500).send(`Error serving index.html: ${err}`);
      }
    });
  });

  // Avvia il server
  app.listen(port, host, () => {
    console.log(`🚀 Server running at http://${host}:${port}`);
  });

}).catch((error) => {
  console.error('❌ Error initializing router:', error);
  process.exit(1);
}); 

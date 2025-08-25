/* eslint-env node */

/**
 * Import function triggers from their respective submodules:
 * const { onCall } = require("firebase-functions/v2/https");
 * const { onDocumentWritten } = require("firebase-functions/v2/firestore");
 */

const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

// Limite de conteneurs pour contrôler les coûts
setGlobalOptions({ maxInstances: 10 });

// Fonction de test simple
exports.helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});
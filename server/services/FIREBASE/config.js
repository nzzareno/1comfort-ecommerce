const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
try {
  initializeApp({
    credential: applicationDefault(),
    // busca la variable de entorno GOOGLE_APPLICATION_CREDENTIALS automaticamente,
  });
  console.log("FIREBASE INITIALIZED");
} catch (error) {
  console.log("Error initializing Firebase: " + error);
}

const db = getFirestore();

module.exports = {
  db,
};

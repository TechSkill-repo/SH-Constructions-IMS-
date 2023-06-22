const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const dotenv = require("dotenv");
dotenv.config();

const serviceAccount = JSON.parse(process.env.SERVICE_KEY);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = db;

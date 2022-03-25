import admin from 'firebase-admin';
import firebaseConfig from '../firebaseConfig';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

if (!getApps().length) {
  initializeApp(firebaseConfig);
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig),
  });
}

const auth = getAuth();
db = admin.firestore();
module.exports = { auth, db };
export default firebaseConfig;

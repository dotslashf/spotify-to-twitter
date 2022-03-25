import firebaseConfig from '../firebaseConfig';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const auth = getAuth();
module.exports = { auth };
export default firebaseConfig;

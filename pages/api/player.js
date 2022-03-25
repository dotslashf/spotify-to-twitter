import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import db from '../../services/firestore';

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req, res) {
  const jwtToken = await getToken({ req, secret });

  if (!jwtToken) {
    return res.status(401).json({ message: 'No token' });
  }

  const {
    token: { sub },
  } = await getSession({ req });

  if (req.method === 'GET') {
    try {
      const docRef = await db.collection('auth').doc(sub).get();
      if (!docRef.exists) {
        return res.status(404).json({ message: 'Not found' });
      }
      const { isUpdating } = docRef.data();
      return res.status(200).json({ isUpdating });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  } else if (req.method === 'POST') {
    try {
      const { isUpdating } = JSON.parse(req.body);
      await db.collection('auth').doc(sub).update({ isUpdating });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }
}

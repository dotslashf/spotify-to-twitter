import db from '../../services/firestore';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const jwtToken = await getToken({ req, secret });

  if (!jwtToken) {
    return res.status(401).json({ message: 'No token' });
  }

  try {
    const {
      token: { sub },
    } = await getSession({ req });
    const { token, secret } = JSON.parse(req.body);
    const docRef = db.collection('auth').doc(sub);
    await docRef.update({
      twitter: {
        accessToken: token,
        secret,
      },
    });
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

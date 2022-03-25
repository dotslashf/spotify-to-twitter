import { getCurrentlyPlaying } from '../../services/spotify';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req, res) {
  const jwtToken = await getToken({ req, secret });

  if (!jwtToken) {
    return res.status(401).json({ message: 'No token' });
  }

  const {
    token: { accessToken },
  } = await getSession({ req });
  console.log('accessToken Cookie', accessToken);
  const response = await getCurrentlyPlaying(accessToken);
  const data = await response.json();

  return res.status(200).json(data);
}

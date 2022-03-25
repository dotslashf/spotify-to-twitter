import { getCurrentlyPlaying } from '../../services/spotify';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const {
    token: { accessToken },
  } = await getSession({ req });
  const response = await getCurrentlyPlaying(accessToken);
  const data = await response.json();

  return res.status(200).json(data);
}

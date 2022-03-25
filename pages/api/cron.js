import db from '../../services/firestore';
import { getCurrentlyPlaying } from '../../services/spotify';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.SPOTIFY_CLIENT_ID}`) {
        const docs = await db.collection('auth').listDocuments();
        Promise.all(
          docs.map(async doc => {
            const docRef = await doc.get();
            const response = await getCurrentlyPlaying(
              docRef.data().spotify.accessToken
            );
            console.log(await response.json());
          })
        );
        return res.status(200).json({ message: 'Success' });
      } else {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}

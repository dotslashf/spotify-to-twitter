import db from '../../services/firestore';
import { getCurrentlyPlaying } from '../../services/spotify';
import parseNowPlaying from '../../utils/parseNowPlaying';
import Twitter from '../../services/twitter';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;

      if (authorization === `Bearer ${process.env.SPOTIFY_CLIENT_ID}`) {
        const docs = await db.collection('auth').listDocuments();
        Promise.all(
          docs.map(async doc => {
            const { spotify, twitter, isUpdating } = (await doc.get()).data();
            if (isUpdating) {
              const response = await getCurrentlyPlaying(spotify.accessToken);
              const { fullText, trackId } = parseNowPlaying(
                await response.json()
              );
              if (spotify.lastPlayed !== trackId) {
                const twitterClient = new Twitter(
                  twitter.accessToken,
                  twitter.secret
                );
                const res = await twitterClient.updateDisplayName(fullText);
                if (res) {
                  console.log(`${doc.id} updated display name to ${fullText}`);
                  await doc.update({
                    spotify: {
                      ...spotify,
                      lastUpdated: new Date(),
                      lastPlayed: trackId,
                    },
                  });
                }
              } else {
                console.log(`${doc.id} already updated display name`);
              }
            } else {
              return;
            }
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

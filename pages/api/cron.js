import db from '../../services/firestore';
import { getCurrentlyPlaying } from '../../services/spotify';
import parseNowPlaying from '../../utils/parseNowPlaying';
import Twitter from '../../services/twitter';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;

      if (
        authorization === `Bearer ${process.env.SPOTIFY_TO_TWITTER_API_KEY}`
      ) {
        const docs = await db.collection('auth').listDocuments();
        Promise.all(
          docs.map(async doc => {
            console.log('updating', doc.id);
            const { spotify, twitter, isUpdating } = (await doc.get()).data();
            if (isUpdating) {
              const response = await getCurrentlyPlaying(spotify.refreshToken);
              const { fullText, trackId } = parseNowPlaying(
                await response.json()
              );
              console.log(spotify.lastTrackId, trackId);
              if (spotify.lastTrackId !== trackId) {
                const twitterClient = new Twitter(
                  twitter.accessToken,
                  twitter.secret
                );
                try {
                  await twitterClient.updateStatus(fullText);
                  await doc.update({
                    spotify: {
                      ...spotify,
                      lastUpdated: new Date(),
                      lastTrackId: trackId,
                    },
                  });
                  console.log(`${doc.id} updated statuses to ${fullText}`);
                } catch (error) {
                  console.error(error);
                }
              } else {
                console.log(`${doc.id} already updated statuses`);
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

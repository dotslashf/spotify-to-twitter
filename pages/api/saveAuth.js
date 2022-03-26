import db from '../../services/firestore';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const { token, account } = JSON.parse(req.body);
    const docRef = await db.collection('auth').doc(token.sub).get();
    if (!docRef.exists) {
      await db
        .collection('auth')
        .doc(token.sub)
        .set({
          spotify: {
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            expiresIn: account.expires_at,
          },
          isUpdating: false,
        });
    } else {
      await db
        .collection('auth')
        .doc(token.sub)
        .update({
          spotify: {
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            expiresIn: account.expires_at,
          },
        });
    }
    return res.status(200).json({ message: 'Success' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
}

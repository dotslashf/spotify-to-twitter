import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const NODE_ENV = process.env.NODE_ENV;

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.refresh_token;
        await fetch(
          `${
            NODE_ENV === 'production'
              ? 'https://spotify-to-twitter.vercel.app/'
              : 'http://localhost:3000/'
          }/api/saveAuth/`,
          {
            method: 'POST',
            body: JSON.stringify({ token, account }),
          }
        );
      }
      return token;
    },
    async session(session, user) {
      session.user = user;
      return session;
    },
  },
});

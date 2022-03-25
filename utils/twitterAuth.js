import { TwitterAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useState, useEffect } from 'react';

const provider = new TwitterAuthProvider();

function useTwitterAuth() {
  const [twitterUser, setTwitterUser] = useState(null);

  const login = () => {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    signInWithPopup(auth, provider)
      .then(result => {
        const credential = TwitterAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const secret = credential.secret;
        if (user) {
          setTwitterUser(user.displayName);
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };

  const logout = async () => {
    try {
      setTwitterUser(null);
      return await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setTwitterUser(user.displayName);
      }
    });
  }, [twitterUser]);

  return {
    login,
    logout,
    twitterUser,
  };
}

export default useTwitterAuth;

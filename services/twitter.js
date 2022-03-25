import Twit from 'twit';

class Twitter {
  constructor(accessToken, secret) {
    this.client = new Twit({
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token: accessToken,
      access_token_secret: secret,
    });
  }

  async updateDisplayName(displayName) {
    try {
      await this.client.post('account/update_profile', {
        name: displayName,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

export default Twitter;

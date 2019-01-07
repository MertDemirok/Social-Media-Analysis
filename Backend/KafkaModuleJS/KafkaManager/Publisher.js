var Twitter = require('twitter');
var config = require('./Config.js');
var T = new Twitter(config);

async function pTwitter(topic) {
  var params = {
    q: topic,
    lang: 'en',
    count: 10
  }
  let tweets = '';

  try {
    tweets = await T.get('search/tweets', params);
  } catch (err) {
    console.log('ERROR :', err)
  }

  return tweets.statuses;
}

module.exports.pTwitter = pTwitter;
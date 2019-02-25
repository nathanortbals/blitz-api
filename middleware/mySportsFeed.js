const MySportsFeeds = require("mysportsfeeds-node");

const msf = new MySportsFeeds("2.0", true);

msf.authenticate(process.env.MY_SPORTS_FEED_API_KEY, "MYSPORTSFEEDS");

module.exports = (feed, params) => msf.getData('nfl', '2019 Playoffs', feed, 'json', params);

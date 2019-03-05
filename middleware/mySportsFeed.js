const MySportsFeeds = require("mysportsfeeds-node");

const msf = new MySportsFeeds("2.0", true);

msf.authenticate(process.env.MY_SPORTS_FEED_API_KEY, "MYSPORTSFEEDS");


// This line should be used when live, but since its the off season we must use prior data
//module.exports = (feed, params) => msf.getData('nfl', 'latest', feed, 'json', params);

module.exports = (feed, params) => msf.getData('nfl', '2018-regular', feed, 'json', params);

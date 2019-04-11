const msf = require('./mySportsFeed');

async function getStats(playerId) {
  const params = {
    player: playerId
  };

  const data = await msf('seasonal_player_stats', params);

  if(data.playerStatsTotals.length > 0) {
    return data.playerStatsTotals[0];
  }
  else {
    return null
  }
}

module.exports = getStats;
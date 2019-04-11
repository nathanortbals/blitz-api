const msf = require('./mySportsFeed');

async function getStats(teamId) {
  const params = {
    team: teamId
  };

  const data = await msf('seasonal_team_stats', params);

  if(data.teamStatsTotals.length > 0) {
    return data.teamStatsTotals[0];
  }
  else {
    return null
  }
}

module.exports = getStats;
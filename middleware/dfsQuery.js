const msf = require('./mySportsFeed');

async function getDfsEntries(position, playerId) {

  const params = {
    //date: getCurDate(),
    date: 20181014,
    dfstype: "draftkings"
  };

  if(playerId) {
    params['player'] = playerId;
  }
  if(position) {
    params['position'] = position;
  }

  const data = await msf('daily_dfs', params);

  if(data.dfsEntries.length === 0 || data.dfsEntries[0].dfsRows.length === 0) {
    return [];
  }

  let dfsRows = data.dfsEntries[0].dfsRows;
  dfsRows = filterDefensePositions(dfsRows, position);

  return dfsRows;
}

function getCurDate() {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const mm = m < 10 ? '0' + m : m;
  const dd = d < 10 ? '0' + d : d;
  return '' + y + mm + dd;
}

function filterDefensePositions(dfsRows, position) {
  return dfsRows.filter(function(dfsRow) {
    if(position) {
      if(position == "d" && !dfsRow.player) {
        return true;
      }
      else if(position != "d" && dfsRow.player) {
        return true;
      }
    }
    else {
      return true;
    }

    return false;
  });
}

module.exports = getDfsEntries;
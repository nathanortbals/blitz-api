const msf = require('./mySportsFeed');

const playerPositions = ['QB', 'WR', 'RB', 'TE'];

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
    if(playerPositions.includes(position)) {
      params['position'] = position;
    }
    else if(position === 'F' || position === 'D') {

    }
    else {
      return []
    }
  }

  let data = await msf('daily_dfs', params);
  data = getDfsRows(data);
  data = filterDefensePositions(data, position);
  setPositions(data, position);

  return data;
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

function getDfsRows(data) {
  if(data.dfsEntries.length === 0 || data.dfsEntries[0].dfsRows.length === 0) {
    return [];
  }

  return data.dfsEntries[0].dfsRows;
}

function filterDefensePositions(dfsRows, position) {
  return dfsRows.filter(function(dfsRow) {
    if(position) {
      if(position === "D" && !dfsRow.player) {
        return true;
      }
      else if(position !== "D" && dfsRow.player) {
        return true;
      }
    }
    else {
      return true;
    }

    return false;
  });
}


function setPositions(dfsRows, position) {
  return dfsRows.forEach(function(dfsRow) {
    if(dfsRow.player) {
      if(playerPositions.includes(dfsRow.player.position)) {
        dfsRow.position = dfsRow.player.position
      }
      else{
        dfsRow.position = 'F'
      }
      delete dfsRow.player.position
    }
    else {
      dfsRow.position = 'D'
    }
  })
}

module.exports = getDfsEntries;
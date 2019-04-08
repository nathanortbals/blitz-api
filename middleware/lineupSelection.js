const msf = require('../middleware/mySportsFeed');

async function getLineup(qb, rb1, rb2, rb3, wr1, wr2, te, k, d, h) {

  const result = {};

  const params = {
    date: 20181014,
    dfstype: "draftkings",
  };

  var response;

  params.position = 'qb';
  response = await msf('daily_dfs', params);
  result['qb'] = response.dfsEntries[0].dfsRows[0];
  params.position = 'rb';
  response = await msf('daily_dfs', params);
  result['rb1'] = response.dfsEntries[0].dfsRows[0];;
  params.position = 'rb';
  response = await msf('daily_dfs', params);
  result['rb2'] = response.dfsEntries[0].dfsRows[0];;
  params.position = 'rb';
  response = await msf('daily_dfs', params);
  result['rb3'] = response.dfsEntries[0].dfsRows[0];;
  params.position = 'wr';
  response = await msf('daily_dfs', params);
  result['wr1'] = response.dfsEntries[0].dfsRows[0];;
  params.position = 'wr';
  response = await msf('daily_dfs', params);
  result['wr2'] = response.dfsEntries[0].dfsRows[0];;
  params.position = 'te';
  response = await msf('daily_dfs', params);
  result['te'] = response.dfsEntries[0].dfsRows[0];;
  params.position = 'k';
  response = await msf('daily_dfs', params);
  result['k'] = response.dfsEntries[0].dfsRows[0];;
  params.position = 'd';
  response = await msf('daily_dfs', params);
  result['d'] = response.dfsEntries[0].dfsRows[0];;
  params.position = 'h';
  response = await msf('daily_dfs', params);
  result['h'] = response.dfsEntries[0].dfsRows[0];;


  return result;
}

module.exports = getLineup;
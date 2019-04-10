const dfsQuery = require('./dfsQuery');

async function getLineup(qb, rb1, rb2, wr1, wr2, wr3, te, f, d) {
  Promise.all([
    dfsQuery('qb', null),
    dfsQuery('rb', null),
    dfsQuery('rb', null),
    dfsQuery('wr', null),
    dfsQuery('wr', null),
    dfsQuery('wr', null),
    dfsQuery('te', null),
    dfsQuery(null, null),
    dfsQuery('d', null)
  ]).then(function(results) {
    return {
      qb: results[0][0],
      rb1: results[1][0],
      rb2: results[2][1],
      wr1: results[3][0],
      wr2: results[4][1],
      wr3: results[5][1],
      te: results[6][0],
      f: results[7][0],
      d: results[8][0],
    };
  }).catch(function(){
      return {};
  });
}

module.exports = getLineup;
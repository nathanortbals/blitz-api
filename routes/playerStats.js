const router = require('express').Router();
const validation = require('../validation/playerStats');
const asyncWrapper = require('../middleware/asyncWrapper');
const playerStatsQuery = require('../middleware/playerStatsQuery');

router.get('/', validation.getPlayerStats, asyncWrapper(async function(req, res) {
  let data = await playerStatsQuery(req.query.id);
  data = data.stats;

  data = {
    gamesPlayed: data.gamesPlayed,
    sections: createStatSectionArray(data)
  };

  res.json(data);
}));

function createStatSectionArray(object) {
  const statsSectionsArray = [];

  for(const key in object) {
    const value = object[key];

    if(typeof(value) === 'object') {
      statsSectionsArray.push({
        name: key,
        stats: createStatArray(value)
      });
    }
  }

  return statsSectionsArray
}

function createStatArray(object) {
  const statArray = [];

  for(const key in object) {
    statArray.push({
      name: key,
      value: object[key].toString()
    });
  }

  return statArray;
}

module.exports = router;
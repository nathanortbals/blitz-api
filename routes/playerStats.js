const router = require('express').Router();
const validation = require('../validation/playerStats');
const msf = require('../middleware/mySportsFeed');
const asyncWrapper = require('../middleware/asyncWrapper');

router.get('/', validation.getPlayerStats, asyncWrapper(async function(req, res) {
  const params = {
    player: req.query.id
  };

  const data = await msf('seasonal_player_stats', params);

  if(data.playerStatsTotals.length > 0) {
    res.json(data.playerStatsTotals[0]);
  }
  else {
    res.json({});
  }
}));

module.exports = router;
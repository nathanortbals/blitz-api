const router = require('express').Router();
const validation = require('../validation/playerStats');
const msf = require('../middleware/mySportsFeed');
const asyncWrapper = require('../middleware/asyncWrapper');

router.get('/', validation.getPlayerStats, asyncWrapper(async function(req, res) {
  const params = {
    player: req.query.id
  };

  const data = await msf('cumulative_player_stats', params);

  if(data.cumulativeplayerstats.playerstatsentry) {
    res.json(data.cumulativeplayerstats.playerstatsentry);
  }
  else {
    res.json({});
  }
}));

module.exports = router;
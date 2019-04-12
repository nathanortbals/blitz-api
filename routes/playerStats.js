const router = require('express').Router();
const validation = require('../validation/playerStats');
const asyncWrapper = require('../middleware/asyncWrapper');
const playerStatsQuery = require('../middleware/playerStatsQuery');

router.get('/', validation.getPlayerStats, asyncWrapper(async function(req, res) {
  const data = await playerStatsQuery(req.query.id);

  res.json(data);
}));

module.exports = router;
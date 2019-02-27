const router = require('express').Router();
const validation = require('../validation/player');
const msf = require('../middleware/mySportsFeed');
const asyncWrapper = require('../middleware/asyncWrapper');

router.get('/', validation.getPlayer, asyncWrapper(async function(req, res) {
  const params = {};
  if(req.query.id) {
    params['player'] = req.query.id;
  }
  if(req.query.position) {
    params['position'] = req.query.position;
  }

  const data = await msf('active_players', params);

  if(data.activeplayers.playerentry) {
    res.json(data.activeplayers.playerentry);
  }
  else {
    res.json({});
  }
}));

module.exports = router;
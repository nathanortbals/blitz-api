const router = require('express').Router();
const validation = require('../validation/player');
const msf = require('../middleware/mySportsFeed');

router.get('/', validation.getPlayer, function(req, res) {
  const params = {};
  if(req.query.id) {
    params['player'] = req.query.id;
  }
  if(req.query.position) {
    params['position'] = req.query.position;
  }

  const data = msf('players', params);

  res.json(data.players);
});

module.exports = router;
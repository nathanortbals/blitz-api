const router = require('express').Router();
const validation = require('../validation/lineup');
const getLineup = require('../middleware/lineupSelection');

router.get('/', validation.getLineup, function(req, res) {
  const result = getLineup(
    req.query.QB,
    req.query.RB1,
    req.query.RB2,
    req.query.RB3,
    req.query.WR1,
    req.query.WR2,
    req.query.TE,
    req.query.K,
    req.query.D,
    req.query.HOLDER);

  res.json(result);
});

module.exports = router;
const router = require('express').Router();
const validation = require('../validation/lineup');
const getLineup = require('../middleware/lineupSelection');
const asyncWrapper = require('../middleware/asyncWrapper');

router.get('/', validation.getLineup, asyncWrapper(async function(req, res) {
  const result = await getLineup(
    req.query.QB,
    req.query.RB1,
    req.query.RB2,
    req.query.RB3,
    req.query.WR1,
    req.query.WR2,
    req.query.TE,
    req.query.K,
    req.query.D,
    req.query.H);

  res.json(result);
}));

module.exports = router;
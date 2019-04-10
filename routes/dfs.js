const router = require('express').Router();
const validation = require('../validation/dfs');
const dfsQuery = require('../middleware/dfsQuery');
const asyncWrapper = require('../middleware/asyncWrapper');

router.get('/', validation.getDfs, asyncWrapper(async function(req, res) {

  const data = await dfsQuery(req.query.position, req.query.id);

  var positions = [];
  data.forEach(function(entry) {
    if(entry.player) {
      if(!positions.includes(entry.player.position)) {
        positions.push(entry.player.position);
      }
    }
  });
  res.json(positions);
}));

module.exports = router;
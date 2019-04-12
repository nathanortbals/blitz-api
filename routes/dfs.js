const router = require('express').Router();
const validation = require('../validation/dfs');
const dfsQuery = require('../middleware/dfsQuery');
const asyncWrapper = require('../middleware/asyncWrapper');

router.get('/', validation.getDfs, asyncWrapper(async function(req, res) {
  const data = await dfsQuery(req.query.position, req.query.id);

  res.json(data);
}));

module.exports = router;
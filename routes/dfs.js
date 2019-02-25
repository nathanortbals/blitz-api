const router = require('express').Router();
const validation = require('../validation/dfs');
const msf = require('../middleware/mySportsFeed');

router.get('/', validation.getDfs, function(req, res) {
  // Set date timestamp to today
  const date = new Date();
  const params = {
    date: date.getTime()
  };

  if(req.query.position) {
    params['position'] = req.query.position;
  }

  const data = msf('daily_dfs', params);

  res.json(data.dfsEntries);
});

module.exports = router;
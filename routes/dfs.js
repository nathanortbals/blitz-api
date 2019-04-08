const router = require('express').Router();
const validation = require('../validation/dfs');
const msf = require('../middleware/mySportsFeed');
const asyncWrapper = require('../middleware/asyncWrapper');

router.get('/', validation.getDfs, asyncWrapper(async function(req, res) {
  // Set date timestamp to today
  const params = {
    //date: getCurDate(),
    date: 20181014,
    dfstype: "draftkings"
  };

  if(req.query.id) {
    params['player'] = req.query.id;
  }
  if(req.query.position) {
    params['position'] = req.query.position;
  }

  const data = await msf('daily_dfs', params);

  if(data.dfsEntries.length > 0) {
    res.json(data.dfsEntries[0].dfsRows)
  } else {
    res.json([]);
  }
}));

function getCurDate() {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  const mm = m < 10 ? '0' + m : m;
  const dd = d < 10 ? '0' + d : d;
  return '' + y + mm + dd;
}

module.exports = router;
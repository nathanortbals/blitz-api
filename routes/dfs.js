const router = require('express').Router();
const validation = require('../validation/dfs');
const msf = require('../middleware/mySportsFeed');
const asyncWrapper = require('../middleware/asyncWrapper');

router.get('/', validation.getDfs, asyncWrapper(async function(req, res) {
  // Set date timestamp to today
  const params = {
    //date: getCurDate()
    date: 20181014
  };

  if(req.query.position) {
    params['position'] = req.query.position;
  }

  try{
    const data = await msf('daily_dfs', params);
    res.json(data);
  }
  catch(err) {
    res.json(err);
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
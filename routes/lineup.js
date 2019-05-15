const router = require('express').Router();
const validation = require('../validation/lineup');
const getLineup = require('../middleware/lineupSelection');
const asyncWrapper = require('../middleware/asyncWrapper');
const dfsQuery = require('../middleware/dfsQuery');

router.get('/', validation.getLineup, asyncWrapper(async function(req, res) {

    let results = await Promise.all([
        getDfsQuery('QB', 'QB', req),
        getDfsQuery('RB', 'RB1', req),
        getDfsQuery('RB', 'RB2', req),
        getDfsQuery('WR', 'WR1', req),
        getDfsQuery('WR', 'WR2', req),
        getDfsQuery('WR', 'WR3', req),
        getDfsQuery('TE', 'TE', req),
        getDfsQuery('F', 'F', req),
        getDfsQuery('D', 'D', req)
    ]);

    let result = {
      qb: results[0][0],
      rb1: results[1][0],
      rb2: results[2][0],
      wr1: results[3][0],
      wr2: results[4][0],
      wr3: results[5][0],
      te: results[6][0],
      f: results[7][0],
      d: results[8][0],
    };

    console.log(result);

    res.json(result);
}));

async function getDfsQuery(position, lineupPosition, req) {
    if(req.query[lineupPosition]) {
        return await dfsQuery(position, req.query[lineupPosition]);
    }
    else {
        return await dfsQuery(position, null);
    }
}

module.exports = router;
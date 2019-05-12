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

    res.json ({
        qb: results[0][0],
        rb1: results[1][0],
        rb2: results[2][0],
        wr1: results[3][0],
        wr2: results[4][0],
        wr3: results[5][0],
        te: results[6][0],
        f: results[7][0],
        d: results[8][0],
    });

    // let results = await getLineup(
    //     req.query.QB,
    //     req.query.RB1,
    //     req.query.RB2,
    //     req.query.WR1,
    //     req.query.WR2,
    //     req.query.WR3,
    //     req.query.TE,
    //     req.query.F,
    //     req.query.D
    // );
    //
    // res.json(results);
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
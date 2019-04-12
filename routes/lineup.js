const router = require('express').Router();
const validation = require('../validation/lineup');
const getLineup = require('../middleware/lineupSelection');
const asyncWrapper = require('../middleware/asyncWrapper');
const dfsQuery = require('../middleware/dfsQuery');

router.get('/', validation.getLineup, asyncWrapper(async function(req, res) {
    let results = await Promise.all([
        dfsQuery('QB', null),
        dfsQuery('RB', null),
        dfsQuery('RB', null),
        dfsQuery('WR', null),
        dfsQuery('WR', null),
        dfsQuery('WR', null),
        dfsQuery('TE', null),
        dfsQuery('F', null),
        dfsQuery('D', null)
    ]);

    res.json ({
        qb: results[0][0],
        rb1: results[1][0],
        rb2: results[2][1],
        wr1: results[3][0],
        wr2: results[4][1],
        wr3: results[5][1],
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

module.exports = router;
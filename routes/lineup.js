const router = require('express').Router();
const validation = require('../validation/lineup');
const getLineup = require('../middleware/lineupSelection');
const asyncWrapper = require('../middleware/asyncWrapper');
const dfsQuery = require('../middleware/dfsQuery');

router.get('/', validation.getLineup, asyncWrapper(async function(req, res) {
  //const result = await getLineup(;
    // req.query.QB,
    // req.query.RB1,
    // req.query.RB2,
    // req.query.WR1,
    // req.query.WR2,
    // req.query.WR3,
    // req.query.TE,
    // req.query.F,
    // req.query.D);


    res.json({"qb":{"player":{"id":14498,"firstName":"Josh","lastName":"Allen","position":"QB","jerseyNumber":17},"team":{"id":48,"abbreviation":"BUF"},"game":{"id":46028,"week":6,"startTime":"2018-10-14T17:00:00.000Z","awayTeamAbbreviation":"BUF","homeTeamAbbreviation":"HOU"},"dfsSourceId":868199,"salary":4700,"fantasyPoints":5.36},"rb1":{"player":{"id":14744,"firstName":"Josh","lastName":"Adams","position":"RB","jerseyNumber":33},"team":{"id":54,"abbreviation":"PHI"},"game":{"id":46022,"week":6,"startTime":"2018-10-12T00:20:00.000Z","awayTeamAbbreviation":"PHI","homeTeamAbbreviation":"NYG"},"dfsSourceId":884549,"salary":3000,"fantasyPoints":0},"rb2":{"player":{"id":7369,"firstName":"Jay","lastName":"Ajayi","position":"RB","jerseyNumber":23},"team":{"id":54,"abbreviation":"PHI"},"game":{"id":46022,"week":6,"startTime":"2018-10-12T00:20:00.000Z","awayTeamAbbreviation":"PHI","homeTeamAbbreviation":"NYG"},"dfsSourceId":590921,"salary":4800,"fantasyPoints":null},"wr1":{"player":{"id":6924,"firstName":"Davante","lastName":"Adams","position":"WR","jerseyNumber":17},"team":{"id":62,"abbreviation":"GB"},"game":{"id":46036,"week":6,"startTime":"2018-10-16T00:15:00.000Z","awayTeamAbbreviation":"SF","homeTeamAbbreviation":"GB"},"dfsSourceId":611417,"salary":8000,"fantasyPoints":38.2},"wr2":{"player":{"id":12659,"firstName":"Quincy","lastName":"Adeboyejo","position":"WR","jerseyNumber":16},"team":{"id":56,"abbreviation":"BAL"},"game":{"id":46033,"week":6,"startTime":"2018-10-14T20:25:00.000Z","awayTeamAbbreviation":"BAL","homeTeamAbbreviation":"TEN"},"dfsSourceId":749174,"salary":3000,"fantasyPoints":null},"wr3":{"player":{"id":12659,"firstName":"Quincy","lastName":"Adeboyejo","position":"WR","jerseyNumber":16},"team":{"id":56,"abbreviation":"BAL"},"game":{"id":46033,"week":6,"startTime":"2018-10-14T20:25:00.000Z","awayTeamAbbreviation":"BAL","homeTeamAbbreviation":"TEN"},"dfsSourceId":749174,"salary":3000,"fantasyPoints":null},"te":{"player":{"id":14693,"firstName":"Jordan","lastName":"Akins","position":"TE","jerseyNumber":88},"team":{"id":64,"abbreviation":"HOU"},"game":{"id":46028,"week":6,"startTime":"2018-10-14T17:00:00.000Z","awayTeamAbbreviation":"BUF","homeTeamAbbreviation":"HOU"},"dfsSourceId":838396,"salary":2500,"fantasyPoints":1.6},"f":{"player":null,"team":{"id":78,"abbreviation":"SF"},"game":{"id":46036,"week":6,"startTime":"2018-10-16T00:15:00.000Z","awayTeamAbbreviation":"SF","homeTeamAbbreviation":"GB"},"dfsSourceId":359,"salary":2000,"fantasyPoints":2},"d":{"player":null,"team":{"id":78,"abbreviation":"SF"},"game":{"id":46036,"week":6,"startTime":"2018-10-16T00:15:00.000Z","awayTeamAbbreviation":"SF","homeTeamAbbreviation":"GB"},"dfsSourceId":359,"salary":2000,"fantasyPoints":2}});
}));

module.exports = router;
const express = require('express');
const bodyParser = require('body-parser');

// Routes
const dfs = require('./routes/dfs');
const lineup = require('./routes/lineup');
const playerStats = require('./routes/playerStats');
const teamStats = require('./routes/teamStats');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/dfs', dfs);
app.use('/lineup', lineup);
app.use('/playerStats', playerStats);
app.use('/teamStats', teamStats);

app.listen(process.env.PORT, () =>
  console.log('Server running on port ' + process.env.PORT)
);
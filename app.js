const express = require('express');
const bodyParser = require('body-parser');
const player = require('./routes/player');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/player', player);

app.listen(process.env.PORT, () =>
  console.log('Server running on port ' + process.env.PORT)
);
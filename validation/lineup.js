const schemaWrapper = require('./schemaWrapper');
const joi = require('joi');

const getLineup = joi.object().keys({
  QB: joi.string().optional(),
  RB1: joi.string().optional(),
  RB2: joi.string().optional(),
  WR1: joi.string().optional(),
  WR2: joi.string().optional(),
  WR3: joi.string().optional(),
  TE: joi.string().optional(),
  F: joi.string().optional(),
  D: joi.string().optional()
});

module.exports = {
  getLineup: schemaWrapper(getLineup)
};
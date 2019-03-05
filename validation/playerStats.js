const schemaWrapper = require('./schemaWrapper');
const joi = require('joi');

const getPlayerStats = joi.object().keys({
  id: joi.string().required()
});

module.exports = {
  getPlayerStats: schemaWrapper(getPlayerStats)
};
const schemaWrapper = require('./schemaWrapper');
const joi = require('joi');

const getTeamStats = joi.object().keys({
  id: joi.string().required()
});

module.exports = {
  getTeamStats: schemaWrapper(getTeamStats)
};
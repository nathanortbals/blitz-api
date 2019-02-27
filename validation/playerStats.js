const schemaWrapper = require('./schemaWrapper');
const joi = require('joi');

const getStats = joi.object().keys({
  id: joi.string().required()
});

module.exports = {
  getStats: schemaWrapper(getStats)
};
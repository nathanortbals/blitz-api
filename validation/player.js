const schemaWrapper = require('./schemaWrapper');
const joi = require('joi');

const getPlayerSchema = joi.object().keys({
  id: joi.string().optional(),
  position: joi.string().optional()
});

module.exports = {
  getPlayer: schemaWrapper(getPlayerSchema)
};
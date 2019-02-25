const schemaWrapper = require('./schemaWrapper');
const joi = require('joi');

const getDfs = joi.object().keys({
  position: joi.string().optional()
});

module.exports = {
  getDfs: schemaWrapper(getDfs)
};
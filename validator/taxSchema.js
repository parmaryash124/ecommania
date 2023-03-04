const Joi = require("joi");
const taxSchema = Joi.object({
  categoryId: Joi.required().messages({
    "any.required": `categoryId is a required field`,
  }),
  taxType: Joi.required().messages({
    "any.required": `taxType is a required field`,
  }),
  taxValue: Joi.required().messages({
    "any.required": `tax value is a required field`,
  })
}).unknown(true);

module.exports = taxSchema;

const Joi = require("joi");
const couponSchema = Joi.object({
  couponTitle: Joi.required().messages({
    "any.required": `couponTitle is a required field`,
  }),
  couponCode: Joi.required().messages({
    "any.required": `couponCode price is a required field`,
  }),
  qty: Joi.required().messages({
    "any.required": `qty is a required field`,
  }),
  startDate: Joi.required().messages({
    "any.required": `startDate  is a required field`,
  }),
  endDate: Joi.required().messages({
    "any.required": `endDate is a required field`,
  }),
  discountType: Joi.required().messages({
    "any.required": `discountType is a required field`,
  }),
  enableStatus: Joi.required().messages({
    "any.required": `enableStatus is a required field`,
  }),
  minimumSpend: Joi.required().messages({
    "any.required": `minimumSpend is a required field`,
  }),
  maximumSpend: Joi.required().messages({
    "any.required": `maximumSpend is a required field`,
  }),
}).unknown(true);

module.exports = couponSchema;

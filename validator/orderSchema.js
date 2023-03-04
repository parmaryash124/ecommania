const Joi = require("joi");
const orderSchema = Joi.object({
  productId: Joi.required().messages({
    "any.required": `productId is a required field`,
  }),
  productPrice: Joi.required().messages({
    "any.required": `product price is a required field`,
  }),
  orderQty: Joi.required().messages({
    "any.required": `orderQty is a required field`,
  }),
  tax: Joi.required().messages({
    "any.required": `Tax  is a required field`,
  }),
  paymentMethod: Joi.required().messages({
    "any.required": `paymentMethod is a required field`,
  }),
  totalAmount: Joi.required().messages({
    "any.required": `totalAmount is a required field`,
  }),
}).unknown(true);

module.exports = orderSchema;

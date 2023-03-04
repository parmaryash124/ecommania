const Joi = require("joi");
const productSchema = Joi.object({
  productName: Joi.string().required().messages({
    "any.required": `Product Name is a required field`,
  }),
  categoryId: Joi.number().required().messages({
    "any.required": `CategoryId is a required field`,
  }),
  subcategoryId: Joi.number().required().messages({
    "any.required": `SubcategoryId is a required field`,
  }),
  price: Joi.string().required().messages({
    "any.required": `Price is a required field`,
  }),
  description: Joi.string().required().messages({
    "any.required": `Description is a required field`,
  }),
  sku: Joi.string().required().messages({
    "any.required": `sku is a required field`,
  }),
  metaTitle: Joi.string().required().messages({
    "any.required": `metaTitle is a required field`,
  }),
  metaDesc: Joi.string().required().messages({
    "any.required": `metaDesc is a required field`,
  }),
  imageAlt: Joi.string().required().messages({
    "any.required": `image alt  is a required field`,
  }),
  qty: Joi.string().required().messages({
    "any.required": `Qty is a required field`,
  }),
  returnPolicy: Joi.string().required().messages({
    "any.required": `Return Policy is required field`,
  }),
  enableDeals: Joi.string().required().messages({
    "any.required": `Enable deal is required field`,
  }),
}).unknown(true);

module.exports = productSchema;

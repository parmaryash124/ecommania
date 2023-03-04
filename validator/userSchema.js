const Joi = require("joi");
const userSchema =Joi.object({
    username: Joi.string().required().messages({
      "any.required": `User name is a required field`,
    }),
    email: Joi.string().email().required().messages({
      "any.required": `Email is a required field`,
    }),
    address: Joi.string().required().messages({
      "any.required": `address is a required field`,
    }),
    phoneNumber: Joi.string().required().messages({
      "any.required": `Phone number is a required field`,
    }),
    password: Joi.string().required().messages({
      "any.required": `password is a required field`,
    }),
  }).unknown(true);


module.exports = userSchema

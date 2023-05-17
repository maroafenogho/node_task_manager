/* eslint-disable prefer-regex-literals */
/* eslint-disable import/no-extraneous-dependencies */
const Joi = require('joi');

const userSchema = Joi.object({
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required(),
  name: Joi.string(),
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }).required(),
});

module.exports = { userSchema, emailSchema };

/* eslint-disable prefer-regex-literals */
/* eslint-disable import/no-extraneous-dependencies */
const Joi = require('joi');

const joiSchema = Joi.object({
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } }),
});

module.exports = joiSchema;

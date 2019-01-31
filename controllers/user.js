
const Joi = require('joi');
const User = require('../models/user');

const userSchema = Joi.object({
  firstname: Joi.string().required().min(4).max(50),
  lastname: Joi.string().required().min(3).max(60),
  role: Joi.string().valid(['admin','writer','guest']),
  createdAt: Joi.date().default(Date.now, 'default date'),
  numberOfArticles: Joi.number().default(0, 'default number'),
  nickname: Joi.string()
})

module.exports = {createUser, User};

async function createUser(user) {
  user = await Joi.validate(user, userSchema, { abortEarly: false});
  return await new User(user).save();
}
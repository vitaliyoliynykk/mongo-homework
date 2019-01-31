
const Joi = require('joi');
const Article = require('../models/article');

const articleSchema = Joi.object({
  title: Joi.string().required().min(5).max(400),
  subtitle: Joi.string().min(5),
  description: Joi.string().min(5).max(500).required(true),
  owner: Joi.string(),
  createdAt: Joi.date().default(Date.now, 'default date'),
  updatedAt: Joi.date().default(Date.now, 'default date'),
  cat: Joi.string().required().valid(['sport','games','history'])
})

module.exports = {createArticle, Article};

async function createArticle(article) {
  article = await Joi.validate(article, articleSchema, { abortEarly: false});
  return await new Article(article).save();
}
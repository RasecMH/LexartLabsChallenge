import joi from 'joi';

export const reqSchema = joi.object({
  query: joi.string().required(),
  category: joi.string().required(),
  store: joi.string().required(),
});

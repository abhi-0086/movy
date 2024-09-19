const joi = require("joi");

const movieValidationSchema = joi.object({
  title: joi.string().required(),
  genres: joi.array().items(joi.string()).required(),
  summary: joi.string().required(),
  director: joi.string().optional(),
  cast: joi.array().items(joi.string()).optional(),
  rating: joi.number().min(1).max(10).allow(null).optional(),
  platforms: joi.array().items(joi.string()).optional(),
  keywords: joi.array().items(joi.string()).optional(),
  haveWatched: joi.boolean().optional(),
  viewingHistory: joi.array().items(joi.date()).optional(), // Ensure viewingHistory is an array of dates
  contentType: joi.number().valid(0, 1, 2, 3).required(), // 0: Movie, 1: Series, 2: Documentary, 3: Short Film
});

const updateMovieValidationSchema = joi.object({
  title: joi.string().optional(),
  genres: joi.array().items(joi.string()).optional(),
  summary: joi.string().optional(),
  director: joi.string().optional(),
  cast: joi.array().items(joi.string()).optional(),
  rating: joi.number().min(1).max(10).allow(null).optional(),
  platforms: joi.array().items(joi.string()).optional(),
  keywords: joi.array().items(joi.string()).optional(),
  haveWatched: joi.boolean().optional(),
  viewingHistory: joi.array().items(joi.date()).optional(),
  contentType: joi.number().valid(0, 1, 2, 3).optional(),
});

module.exports = { movieValidationSchema, updateMovieValidationSchema };

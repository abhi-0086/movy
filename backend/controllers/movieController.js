const Movie = require("../models/Movie");
const {
  movieValidationSchema,
  updateMovieValidationSchema,
} = require("../validations/movieValidation");

//create a new movie
const createMovie = async (req, res) => {
  const { error } = movieValidationSchema.validate(req.body);
  if (error) {
    res.status(400).json({ msg: error.details[0].message });
  }
  const {
    title,
    genres,
    summary,
    director,
    cast,
    rating,
    platforms,
    keywords,
    haveWatched,
    viewingHistory,
    contentType,
  } = req.body;
  const userId = req.user.userId;

  try {
    const newMovie = new Movie({
      title,
      genres,
      summary,
      director,
      cast,
      rating,
      platforms,
      keywords,
      haveWatched,
      viewingHistory,
      contentType,
      userId,
    });

    const savedMovie = await newMovie.save();
    if (!savedMovie)
      return res.status(500).json({
        msg: "Failed to create movie!!",
      });
    else {
      return res.status(201).json(savedMovie);
    }
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Oops, something went wrong. Please try again later!!" });
  }
};

module.exports = { createMovie };

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

const getMovies = async (req, res) => {
  const userId = req.user.userId;
  const { haveWatched, genre, contentType } = req.body;

  try {
    let filters = { userId };

    // if (haveWatched !== undefined && haveWatched !== null)
    //   filters.haveWatched = haveWatched === "true";

    if (
      haveWatched !== undefined &&
      haveWatched !== "" &&
      haveWatched !== null
    ) {
      filters.haveWatched = haveWatched === true; // Use boolean
    }

    // if (genre && genre !== "") filters.genres = genre;
    if (Array.isArray(genre) && genre.length > 0) {
      filters.genres = { $in: genre }; // Filter by multiple genres
    } else if (genre && genre !== "") {
      filters.genres = { $in: [genre] }; // Single genre
    }

    // if (contentType !== undefined && contentType !== null)
    //   filters.contentType = parseInt(contentType);

    if (
      contentType !== undefined &&
      contentType !== "" &&
      contentType !== null
    ) {
      filters.contentType = parseInt(contentType);
    }

    const movies = await Movie.find(filters);
    if (movies.length === 0)
      return res.status(404).json({ msg: "No movies found" });
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch movies" });
  }
};

module.exports = { createMovie, getMovies };

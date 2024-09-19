const express = require("express");
const {
  createMovie,
  getMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../controllers/movieController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

//create a new movie (protected route)
router.post("/", authMiddleware, createMovie);

//get all movie list (protected route)
router.get("/", authMiddleware, getMovies);

//get movie by id (protected route)
router.get("/:id", authMiddleware, getMovieById);

//update movie by id (protected route)
router.put("/:id", authMiddleware, updateMovie);

//delete movie by id (protected route)
router.delete("/:id", authMiddleware, deleteMovie);

module.exports = router;

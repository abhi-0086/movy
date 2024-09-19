const { required } = require("joi");
const mongoose = require("mongoose");

const Movie = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    genres: {
      type: [String],
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },

    director: {
      type: String,
    },
    cast: {
      type: [String],
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
      default: null,
    },
    platforms: {
      type: [String],
    },
    keywords: {
      type: [String],
    },
    haveWatched: {
      type: Boolean,
      default: false,
    },
    viewingHistory: {
      type: [Date], // Dates when the movie was watched
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movie", MovieSchema);

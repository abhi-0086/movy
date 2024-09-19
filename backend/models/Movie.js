const { required } = require("joi");
const mongoose = require("mongoose");

const MovieSchema = mongoose.Schema(
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
    contentType: {
      type: Number, // 0: Movie, 1: Series, 2: Documentary, 3: Short film
      required: true,
      enum: [0, 1, 2, 3],
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

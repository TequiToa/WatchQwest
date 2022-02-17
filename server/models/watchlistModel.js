import mongoose from "mongoose";

const watchlistSchema = mongoose.Schema({
  stats: {
    type: Object,
    required: true,
  },
  animeList: {
    type: Array,
    required: true,
  },
});

const watchlistModel = mongoose.model("watchlist", watchlistSchema);

export default watchlistModel;

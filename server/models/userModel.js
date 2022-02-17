import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: Object,
    required: true,
  },
  watchlistId: {
    type: mongoose.ObjectId,
    required: true,
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;

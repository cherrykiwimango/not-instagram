import mongoose from "mongoose";

const postsSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

const PostsModel = mongoose.model("Post", postsSchema);
export default PostsModel;
import PostsModel from '../models/posts.model.js';

export const getPosts = async (req, res) => {
  try {
    const posts = await PostsModel.find({});
    res.status(200).json({ success: true, data: posts });
  }
  catch (error) {
    console.log("Error while fetching images: ", error);
    res.status(400).json({ success: false, message: "Error while fetching the images" });
  }
}

export const createPost = async (req, res) => {
  const post = req.body;
  if (!post.image || !post.comment || !post.userName) {
    return res.status(400).json({ success: false, message: "Please provide all fields" });
  }

  const newPost = new PostsModel(post);
  try {
    await newPost.save();
    res.status(200).json({ success: true, message: "Post created successfully", data: newPost });
  }
  catch (error) {
    console.log("Error in creating post: ", error);
    res.status(500).json({ success: false, message: "Internal Server error" });
  }
}
import Comment from "./comments.model.js";
import Post from "../post/post.model.js";

export const createComment = async (req, res) => {
    try {
      const { username, content, post } = req.body;
  
      const existingPost = await Post.findById(post);
      if (!existingPost) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      const newComment = new Comment({ username, content, post });
      await newComment.save();
  
      existingPost.comments.push(newComment._id);
      await existingPost.save();
  
      res.status(201).json(newComment);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

export const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comments = await Comment.find({ post: postId }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedComment = await Comment.findByIdAndDelete(id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
import Post from "./post.model.js";
import Course from "../curse/curse.model.js";

export const createPost = async (req, res) => {
  try {
    const { title, description, course } = req.body;
    const newPost = new Post({ title, description, course });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const { course, sort } = req.query;

    let filter = {};
    if (course) {
      const courseData = await Course.findOne({ CurseName: course });
      if (!courseData) {
        return res.status(404).json({ message: "Curso no encontrado" });
      }
      filter.course = courseData._id;
    }

    const sortOrder = sort === "asc" ? 1 : -1; 
    const posts = await Post.find(filter)
      .populate("course", "CurseName")
      .sort({ createdAt: sortOrder }); 

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error al obtener las publicaciones:", error);
    res.status(500).json({ message: "Error al obtener las publicaciones" });
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id)
      .populate("course", "CurseName")
      .populate({
        path: "comments",
        select: "username content createdAt",
        options: { sort: { createdAt: -1 } },
      });

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, course } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, description, course },
      { new: true, runValidators: true }
    ).populate("course", "CurseName");
    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost)
      return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
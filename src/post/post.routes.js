import { Router } from "express";
import {createPost,getPosts,getPostById,updatePost,deletePost} from "./post.controller.js";
import { validarCrearPublicacion } from "../middleware/CommentsPostValidator.js";

const router = Router();

router.post("/addPost",validarCrearPublicacion, createPost);

router.get("/", getPosts);

router.get("/:id", getPostById);

router.put("/:id", updatePost);

router.delete("/:id", deletePost);

export default router;
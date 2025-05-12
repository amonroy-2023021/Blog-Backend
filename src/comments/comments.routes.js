import { Router } from "express";
import {createComment,getCommentsByPost,deleteComment,} from "./comments.controller.js";
import { validarCrearComentario } from "../middleware/CommentsPostValidator.js";

const router = Router();

router.post("/addComment",validarCrearComentario, createComment);

router.get("/:postId", getCommentsByPost);

router.delete("/:id", deleteComment);

export default router;
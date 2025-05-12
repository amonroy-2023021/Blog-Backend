import { Router } from "express";
import {
  createCourse,getCourses,getCourseById,updateCourse,deleteCourse,} from "./curse.controller.js";

const router = Router();

router.post("/addCourse", createCourse);

router.get("/", getCourses);

router.get("/:id", getCourseById);

router.put("/:id", updateCourse);

router.delete("/:id", deleteCourse);

export default router;
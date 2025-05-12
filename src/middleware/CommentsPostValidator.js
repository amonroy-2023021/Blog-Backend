import { body, param } from "express-validator";

export const validarCrearComentario = [
  body("username")
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio.")
    .isLength({ max: 50 })
    .withMessage("El nombre de usuario no puede exceder los 50 caracteres."),
  body("content")
    .notEmpty()
    .withMessage("El contenido del comentario es obligatorio.")
    .isLength({ max: 500 })
    .withMessage("El contenido no puede exceder los 500 caracteres."),
  body("post")
    .notEmpty()
    .withMessage("El ID de la publicación es obligatorio.")
    .isMongoId()
    .withMessage("El ID de la publicación debe ser un ID válido."),
];

export const validarCrearPublicacion = [
  body("title")
    .notEmpty()
    .withMessage("El título es obligatorio.")
    .isLength({ max: 50 })
    .withMessage("El título no puede exceder los 50 caracteres."),
  body("description")
    .notEmpty()
    .withMessage("La descripción es obligatoria.")
    .isLength({ max: 500 })
    .withMessage("La descripción no puede exceder los 500 caracteres."),
  body("course")
    .notEmpty()
    .withMessage("El curso asociado es obligatorio.")
    .isMongoId()
    .withMessage("El ID del curso debe ser un ID válido."),
];
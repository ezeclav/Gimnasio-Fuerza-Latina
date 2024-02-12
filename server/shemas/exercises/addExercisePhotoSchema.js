import joi from "joi";

// Importamos el esquema que verifica una imagen.
import imgSchema from "../../src/schemas/imgSchema.js";

// Creamos el esquema de Joi donde comprobamos todas las propiedades necesarias.
const addExercisePhotoSchema = joi.object({
  photo: imgSchema.required(),
});

export default addExercisePhotoSchema;

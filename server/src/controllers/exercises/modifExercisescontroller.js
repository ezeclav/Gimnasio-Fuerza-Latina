import { cloudinaryService } from "../../services/cloudinaryService.js";
import modifExerciseModel from "../../models/exercises/modifExerciseModel.js";
import { emptyFieldExerciseError } from "../../services/errorService.js";
// import {
//   savePhotoService,
//   deletePhotoService,
// } from "../../services/photoService.js";

const modifExercisesController = async (req, res, next) => {
  try {
    let { exerciseId } = req.params;
    let { name, description, typology, muscle_group, equipment } = req.body;

    if (!name && !description && !typology && !muscle_group && !equipment)
      emptyFieldExerciseError;

    let photoName = "";

    // Verificar si hay una nueva foto en la solicitud
    if (req.files && Object.values(req.files).length > 0) {
      const newPhoto = Object.values(req.files)[0];
      // Subir la nueva foto y obtener la nueva URL
      photoName = await cloudinaryService(newPhoto);
    }

    // if (req.files) {
    //   for (let photo of Object.values(req.files).slice(0, 1)) {
    //     const photo = req.files;
    //     console.log("antes de mandarlo", photo);
    //     const photoName = await cloudinaryService(photo);
    //     // photoName = await savePhotoService(photo, 500);
    //   }
    // }

    const exercise = await modifExerciseModel(
      exerciseId,
      name,
      description,
      typology,
      muscle_group,
      equipment,
      photoName
    );

    // se utilizaría si se almacena de manera local
    // const { name: imgName } = exercise[0];
    // await deletePhotoService(imgName);

    res.send({
      status: "ok",
      message: "Ejercicio modificado con EXITO",
    });
  } catch (error) {
    next(error);
  }
};

export default modifExercisesController;

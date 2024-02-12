import selectAllExercisesModel from "../../models/exercises/selectAllExercisesModel.js";
import selectExercisesByQueryParamsModel from "../../models/exercises/selectExercisesByQueryParamsModel.js";

const listExercisesController = async (req, res, next) => {
  try {
    const queryParams = req.query;

    let exercises;

    // Verifica si hay parámetros de consulta definidos
    if (Object.keys(queryParams).length === 0) {
      // Si no hay parámetros, ejecuta la búsqueda total
      exercises = await selectAllExercisesModel();
    } else {
      // Si hay parámetros, llama a la función para obtener ejercicios según los parámetros
      exercises = await selectExercisesByQueryParamsModel(queryParams);
    }

    res.send({
      data: exercises,
    });
  } catch (error) {
    next(error);
  }
};

export default listExercisesController;

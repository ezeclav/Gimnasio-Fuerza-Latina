import insertLikeModel from "../../models/exercises/insertLikeModel.js";

const likeExerciseController = async (req, res, next) => {
  try {
    const { exerciseId } = req.params;
    const userId = req.user.id;
    console.log(userId);
    const like = await insertLikeModel(userId, exerciseId);

    res.send({
      status: "ok",
      message: "like guardado",
    });
  } catch (error) {
    next(error);
  }
};

export default likeExerciseController;

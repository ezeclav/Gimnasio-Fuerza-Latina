import { useState } from "react";
import axios from "axios";
import auth from "../../../utils/auth";
import { Link, useParams, useNavigate } from "react-router-dom";

import "./ExerciseDelete.css";

function ExerciseDelete() {
  const [okExercise, setOkExercise] = useState("");
  const { exerciseId } = useParams();

  const handleDelete = async () => {
    setOkExercise("");

    const token = auth.getToken();
    try {
      // Obtener información del ejercicio antes de eliminar (para poder eliminar la foto)
      const { data: exerciseData } = await axios.get(
        `/api/exercise/${exerciseId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Eliminar ejercicio
      const response = await axios.delete(`api/deleteExercise/${exerciseId}`, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.status === "ok") {
        // Eliminar foto si existe
        if (
          exerciseData &&
          exerciseData.photos &&
          exerciseData.photos.length > 0
        ) {
          const photoName = exerciseData.photos[0].name;
          await axios.delete(`/api/exercise/${exerciseId}/photo/${photoName}`, {
            headers: {
              Authorization: token,
            },
          });
        }

        setOkExercise("Ejercicio y foto eliminados con éxito.");
      }
    } catch (error) {
      console.error("Error al eliminar el ejercicio:", error);
      const noOk = error.response?.data?.message || "Intente nuevamente.";
      setOkExercise(`ERROR al eliminar el ejercicio: ${noOk}`);
    }
  };

  return (
    <div className="delete-exercise-form">
      <h2>Eliminar ejercicio</h2>
      <p>
        ¿Estás seguro de que deseas eliminar este ejercicio y su foto asociada?
      </p>

      <button onClick={handleDelete}>Eliminar Ejercicio y Foto</button>
      <Link to="#" onClick={() => window.history.back()}>
        Cancelar
      </Link>
      {okExercise && <p>{okExercise}</p>}
    </div>
  );
}

export default ExerciseDelete;

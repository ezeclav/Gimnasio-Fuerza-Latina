import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ExerciseDelete = ({ exerciseId, onDelete }) => {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      const options = {
        headers: {
          Authorization: token,
        },
      };

      await axios.delete(`api/deleteExercise/${exerciseId}`, options);
      onDelete(exerciseId);
    } catch (error) {
      console.error("Error al eliminar el ejercicio:", error);
    }
  };

  return (
    <div>
      <h2> ¿Realmente quieres eliminar el ejercicio? </h2>
      <button onClick={() => handleDelete(exerciseId)}>Eliminar</button>
      <Link to="#" onClick={() => window.history.back()}>
        Cancelar
      </Link>
    </div>
  );
};

export default ExerciseDelete;

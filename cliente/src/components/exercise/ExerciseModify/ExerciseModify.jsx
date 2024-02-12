import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ExerciseModify = () => {
  const { exerciseId } = useParams();
  const [exercise, setExercise] = useState({
    name: "",
    description: "",
    typology: "",
    muscle_group: "",
    equipment: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const options = {
        headers: {
          Authorization: token,
        },
      };

      await axios.put(`/api/modifExercise/${exerciseId}`, options, {
        headers: {
          Authorization: token
        }
      });
    } catch (error) {
      console.error("Error al modificar el ejercicio:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise((prevExercise) => ({
      ...prevExercise,
      [name]: value
    }));
  };


  return (
    <div>
      <h2>Editar Ejercicio</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            autoComplete="off"
            value={exercise.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={exercise.description}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="typology">Tipología:</label>
          <input
            required
            type="radio"
            id="typologyFuerza"
            name="typology"
            value="Fuerza"
            onChange={handleChange}
            checked={formData.typology === "Fuerza"}
          />
          Fuerza
          <input
            type="radio"
            id="typologyPotencia"
            name="typology"
            value="Potencia"
            onChange={handleChange}
            checked={formData.typology === "Potencia"}
          />
          Potencia
          <input
            type="radio"
            id="typologyResistencia"
            name="typology"
            value="Resistencia"
            onChange={handleChange}
            checked={formData.typology === "Resistencia"}
          />
          Resistencia
        <label>
          Grupo Muscular:
          <input
            type="text"
            name="muscle_group"
            value={exercise.muscle_group}
            onChange={handleChange}
          />
        </label>
        <label>
          Equipamiento:
          <input
            type="text"
            name="equipment"
            value={exercise.equipment}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
};

export default ExerciseModify;

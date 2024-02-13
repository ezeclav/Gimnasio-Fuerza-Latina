import { useState, useEffect } from "react";
import axios from "axios";
import auth from "../../../utils/auth";
import { Link, useParams } from "react-router-dom";
import ExercisePhoto from "../ExercisePhoto/ExercisePhoto";

import "./ExerciseModify.css";

function ExerciseModify() {
  const [okExercise, setOkExercise] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    typology: "Fuerza",
    muscle_group: "",
    equipment: "",
  });
  const { exerciseId } = useParams();

  useEffect(() => {
    const fetchExerciseData = async () => {
      const token = auth.getToken();
      try {
        const response = await axios.get(`/api/exercise/${exerciseId}`, {
          headers: {
            Authorization: token,
          },
        });

        const { name, description, typology, muscle_group, equipment } =
          response.data.data;

        setFormData({
          name,
          description,
          typology,
          muscle_group,
          equipment,
        });
      } catch (error) {
        console.error("Error al obtener información del ejercicio:", error);
      }
    };

    fetchExerciseData();
  }, [exerciseId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhotoChange = (file) => {
    setFormData({
      ...formData,
      photo: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setOkExercise("");

    const token = auth.getToken();
    try {
      // Modificar la información del ejercicio
      const response = await axios.put(
        `api/modifExercise/${exerciseId}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.data.status === "ok") {
        setOkExercise("Ejercicio modificado con éxito.");
      }
    } catch (error) {
      console.error("Error al modificar el ejercicio:", error);
      const noOk = error.response?.data?.message || "Intente nuevamente.";
      setOkExercise(`ERROR al modificar el ejercicio: ${noOk}`);
    }
  };

  return (
    <div className="modify-exercise-form">
      <h2>Modificar ejercicio</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nombre:</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="descrpition">Descripción: </label>
          <textarea
            required
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
          ></textarea>
        </div>

        <div className="form-group">
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
        </div>

        <div className="form-group">
          <label htmlFor="muscle_group">Grupo Muscular:</label>
          <input
            required
            type="text"
            id="muscle_group"
            name="muscle_group"
            value={formData.muscle_group}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label htmlFor="equipment">Equipo:</label>
          <input
            required
            type="text"
            id="equipment"
            name="equipment"
            value={formData.equipment}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <ExercisePhoto
          exerciseId={exerciseId}
          onUpload={handlePhotoChange}
          onClose={() => {}}
        />

        <button type="submit" className="btn btn-primary">
          Modificar Ejercicio
        </button>
        <Link
          to="#"
          onClick={() => window.history.back()}
          className="btn btn-secondary"
        >
          Cancelar
        </Link>

        {okExercise && <p>{okExercise}</p>}
      </form>
    </div>
  );
}

export default ExerciseModify;

import { Link } from "react-router-dom";
import "./ExerciseCard.css";
import { AuthContext } from "../../../context/AuthContext";
import LikeToggle from "../../Favorites/LikeToggle/index";
import { useState, useEffect } from "react";
const defaultExercise = "https://placehold.co/90x90.png";

function ExerciseCard({ id, name, typology, muscle_group, equipment, photos }) {
  return (
    <div className="exercise-list-card">
      <div className="exercise-details">
        <Link to={`/exercise/${id}`} className="exercise-link">
          <h3 className="exercise-nombre">{name}</h3>

          {Array.isArray(photos) ? (
            photos.length > 0 ? (
              <div className="photo-container">
                {photos.map((photo, index) => (
                  <img key={index} src={photo} alt={`Exercise ${name}`} />
                ))}
              </div>
            ) : (
              <div className="photo-container">
                <img src={defaultExercise} alt="" />
              </div>
            )
          ) : (
            <div className="photo-container">
              <img src={photos} alt={`Exercise ${photos}`} />
            </div>
          )}

          <p className="exercise-tipologia">
            <span className="underline">Tipología:</span>&nbsp; {typology}
          </p>
          <p className="exercise-grupo-muscular">
            <span className="underline">Grupo Muscular:</span>&nbsp;{" "}
            {muscle_group}
          </p>
          <p className="exercise-equipo">
            <span className="underline">Equipamiento:</span>&nbsp; {equipment}
          </p>
        </Link>
        <LikeToggle exerciseId={id} />
      </div>
    </div>
  );
}

export default ExerciseCard;

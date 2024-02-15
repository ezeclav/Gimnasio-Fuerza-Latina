import React, { useState, useEffect } from "react";
import "./likeToogle.css";

const LikeToggle = ({ exerciseId }) => {
  const storedLike = localStorage.getItem(`exercise-${exerciseId}`);
  const [isLiked, setIsLiked] = useState(storedLike === "true");

  const handleLikeToggle = async () => {
    try {
      const token = localStorage.getItem("token");
      if (isLiked) {
        await fetch(`/api/dislike/${exerciseId}`, {
          method: "DELETE",
          headers: {
            Authorization: token,
          },
        });
      } else {
        await fetch(`/api/exercise/like/${exerciseId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        });
      }
      // Toggle del estado y almacenar en el localStorage
      setIsLiked((prevIsLiked) => !prevIsLiked);
      localStorage.setItem(`exercise-${exerciseId}`, (!prevIsLiked).toString()); // Usar !prevIsLiked en lugar de isLiked
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  // Usar useEffect para actualizar el estado cuando cambia el valor en localStorage
  useEffect(() => {
    const storedLike = localStorage.getItem(`exercise-${exerciseId}`);
    setIsLiked(storedLike === "true");
  }, [exerciseId]);

  return (
    <div>
      <span
        className="like-toggle-heart"
        onClick={handleLikeToggle}
        style={{ cursor: "pointer", color: isLiked ? "red" : "black" }}
      >
        &#10084;
      </span>
    </div>
  );
};

export default LikeToggle;

import React, { useEffect } from "react";

const DeleteExerciseLike = ({ exerciseId }) => {
  useEffect(() => {
    const handleDeleteLike = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`/api/dislike/${exerciseId.exerciseId}`, {
          method: "DELETE", // Cambiado a método DELETE
          headers: {
            Authorization: token,
          },
        });

        if (!response.ok) {
          console.error("Error al procesar la solicitud");
        } else {
          // Maneja la respuesta del servidor, si es necesario
          const data = await response.json();
          console.log("Respuesta del servidor:", data);
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
    };

    // Llama a la función de eliminar de favoritos al cargar el componente
    handleDeleteLike();
  }, [exerciseId]);

  return (
    <div>
      <p>Eliminado de Favoritos</p>
    </div>
  );
};

export default DeleteExerciseLike;

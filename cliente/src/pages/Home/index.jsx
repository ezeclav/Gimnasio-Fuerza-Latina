import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import "./Home.css";

function Home() {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    <div>
      {/* <img
        src="https://static.wixstatic.com/media/11062b_565b6e9e1a7a45a9b6693b9e00f9de4d~mv2_d_6720_4480_s_4_2.jpg/v1/fill/w_1007,h_625,fp_0.16_0.32,q_85,usm_0.66_1.00_0.01,enc_auto/11062b_565b6e9e1a7a45a9b6693b9e00f9de4d~mv2_d_6720_4480_s_4_2.jpg"
        alt="Intense Workout"
      /> */}
      {isAuthenticated && user ? (
        <>
          <h2 className="GymFont">GIMNASIOS FUERZA LATINA 🏋️‍♂️🤸‍♂️</h2>
          <h3>Bienvenido: {user.username}</h3>
        </>
      ) : (
        <>
          <h2 className="GymFont">GIMNASIOS FUERZA LATINA 🏋️‍♂️🤸‍♂️</h2>
          <h3>Ingresa a tu cuenta por favor</h3>
        </>
      )}
    </div>
  );
}

export default Home;

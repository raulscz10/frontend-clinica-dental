import React from 'react';
import "./Home.scss";
import HomeImage from "../../../public/images/home.webp";

function Home() {
  return (
    <div className="Home">
      <h1>Home</h1>
      <div className="main-container">
        <div className="main-text">
          <h3>Bienvenidos a la Clínica Dental Sunset</h3>
          <p>Manten tu dentadura sana.</p>
        </div>
        <div className="main-image">
          <img src={HomeImage} alt="Imagen de la Home" className='homeImage'/>
        </div>
      </div>
    </div>
  )
}

export default Home;

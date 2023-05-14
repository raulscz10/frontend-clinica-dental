import React, { useEffect, useState } from "react";
import "./Profile.scss";
import profileImage from "../../../public/images/userProfile.png";

function Profile({ profile }) {
    //HOOKS
    const [showForm, setShowForm] = useState(false);

    const handleShowForm = () =>{
        setShowForm(true);
    }

    const handleHiddeForm = () =>{
        setShowForm(false);
    }

  return (
    <div className='Profile'>
        <div className="container-myProfile">
            <p className="profileName">{profile.user_name} {profile.user_surname}</p>
            <div className="subContainer-myProfile">
                <div className="container-image">
                    <img src={profileImage} alt="" className="image"/>
                </div>
                <div className="info-myProfile">
                    <div className="title-info">
                        <h3>Información Personal</h3>
                    </div>
                    <div className="text-info">
                        <p>Correo: {profile.user_gmail}</p>
                    </div>
                    <div className="text-info">
                        <p>Edad: {profile.user_age}</p>
                    </div>
                    <div className="text-info">
                        <p>Telefono: {profile.user_phone}</p>
                    </div>
                </div>
            </div>
            {showForm && (
                <>
                    <div className="footer-myProfile">
                        <button className="btn-myProfile" onClick={handleHiddeForm}>Modificar Perfil</button>
                    </div>
                </>
            )}
            {!showForm && (
                <>
                    <div className="footer-myProfile">
                        <button className="btn-myProfile" onClick={handleShowForm}>Modificar Perfil</button>
                    </div>
                </>
            )}
        </div>
        {showForm && (
            <>
              <p>Hola</p>
            </>
        )}
    </div>
  )
}

export default Profile;

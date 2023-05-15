import React, { useEffect, useState } from "react";
import "./Profile.scss";
import profileImage from "../../../public/images/userProfile.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../../_services/userService";

function Profile({ profile }) {
  const initialFormValues = {
    user_name: profile.user_name,
    user_surname: profile.user_surname,
    user_password: profile.user_password,
    user_age: profile.user_age,
    user_phone: profile.user_phone,
    user_gmail: profile.user_gmail,
  };

  //HOOKS
  const [formValues, setFormValues] = useState(initialFormValues);

  const [showForm, setShowForm] = useState(false);

  const [updateError, setUpdateError] = useState(null);

  const authState = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHiddeForm = () => {
    setShowForm(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const credentials = {
      user_name: formValues.user_name,
      user_surname: formValues.user_surname,
      user_password: formValues.user_password,
      user_age: formValues.user_age,
      user_phone: formValues.user_phone,
      user_gmail: formValues.user_gmail,
    };
    updateMyProfile(authState.userInfo.id, credentials);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value, //key: value
    });
  };

  const updateMyProfile = async (id, credentials) => {
    try {
      const response = await userService.updateMyProfile(id, credentials);
      console.log(response); //TODO
      setUpdateError(null);
      navigate("/");
    } catch (error) {
      console.log(error);   //TODO
      setUpdateError(error.response.data.message);
    }
  };

  return (
    <div className="Profile">
      <div className="container-myProfile">
        <p className="profileName">
          {profile.user_name} {profile.user_surname}
        </p>
        <div className="subContainer-myProfile">
          <div className="container-image">
            <img src={profileImage} alt="" className="image" />
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
              <button className="btn-myProfile" onClick={handleHiddeForm}>
                Modificar Perfil
              </button>
            </div>
          </>
        )}
        {!showForm && (
          <>
            <div className="footer-myProfile">
              <button className="btn-myProfile" onClick={handleShowForm}>
                Modificar Perfil
              </button>
            </div>
          </>
        )}
      </div>
      {showForm && (
        <>
          <div className="update-container">
            <form noValidate onSubmit={handleUpdate}>
              <h3>Formulario</h3>
              <div className="section-container">
                <div className="label-section">
                  <label className="register-label">Nombre</label>
                  <input
                    type="text"
                    name="user_name"
                    className="register-input"
                    placeholder="Nombre..."
                    value={formValues.user_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="label-section">
                  <label className="register-label">Apellidos</label>
                  <input
                    type="text"
                    name="user_surname"
                    className="register-input"
                    placeholder="Apellidos..."
                    value={formValues.user_surname}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="section-container">
                <div className="label-section">
                  <label className="register-label">Edad</label>
                  <input
                    type="number"
                    name="user_age"
                    className="register-input"
                    placeholder="Edad..."
                    value={formValues.user_age}
                    onChange={handleChange}
                  />
                </div>
                <div className="label-section">
                  <label className="register-label">Telefono</label>
                  <input
                    type="text"
                    name="user_phone"
                    className="register-input"
                    placeholder="Telefono..."
                    value={formValues.user_phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="section-container">
                <div className="label-section">
                  <label className="register-label">Correo</label>
                  <input
                    type="email"
                    name="user_gmail"
                    className="register-input"
                    placeholder="Correo..."
                    value={formValues.user_gmail}
                    onChange={handleChange}
                  />
                </div>
                <div className="label-section">
                  <label className="register-label">Contraseña</label>
                  <input
                    type="password"
                    name="user_password"
                    className="register-input"
                    placeholder="Contraseña..."
                    value={formValues.user_password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="button-section">
                <button className="btn-register">Send</button>
              </div>
            </form>
          </div>
          {updateError && <p style={{ color: "red" }}>{updateError}</p>}
        </>
      )}
    </div>
  );
}

export default Profile;

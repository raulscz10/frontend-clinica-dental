import React, { useEffect, useState } from "react";
import "./Register.scss";
import authService from "../../_services/authService";
import { useNavigate } from "react-router-dom";

function Register() {
  const initialFormValues = {
    user_name: "",
    user_surname: "",
    user_password: "",
    user_age: "1",
    user_phone: "",
    user_gmail: "",
  };

  // HOOKS
  const [formValues, setFormValues] = useState(initialFormValues);

  const [signInError, setSignInError] = useState(null);

  const navigate = useNavigate();

  //HANDLERS
  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      user_name: formValues.user_name,
      user_surname: formValues.user_surname,
      user_password: formValues.user_password,
      user_age: formValues.user_age,
      user_phone: formValues.user_phone,
      user_gmail: formValues.user_gmail,
    };
    singIn(credentials);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value, //key: value
    });
  };

  const singIn = async (credentials) => {
    try {
      const response = await authService.signIn(credentials);
      setSignInError(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
      setSignInError(error.response.data.message);
    }
  };

  return (
    <div className="Register">
      <h1>Registro</h1>
      <div className="main-container">
        <div className="register-container">
          <form noValidate onSubmit={handleSubmit}>
              <div className="section-container">
                <div className="label-section">
                    <label className='register-label'>Nombre</label>
                    <input type="text" name="user_name" className="register-input" placeholder='Nombre...' value={formValues.user_name} onChange={handleChange}/>
                </div>
                <div className="label-section">
                    <label className='register-label'>Apellidos</label>
                    <input type="text" name="user_surname" className="register-input" placeholder='Apellidos...' value={formValues.user_surname} onChange={handleChange}/>
                </div>
              </div>
              <div className="section-container">
                <div className="label-section">
                    <label className='register-label'>Edad</label>
                    <input type="number" name="user_age" className="register-input" placeholder='Edad...' value={formValues.user_age} onChange={handleChange}/>
                </div>
                <div className="label-section">
                    <label className='register-label'>Telefono</label>
                    <input type="text" name="user_phone" className="register-input" placeholder='Telefono...' value={formValues.user_phone} onChange={handleChange}/>
                </div>
              </div>
              <div className="section-container">
                <div className="label-section">
                    <label className='register-label'>Correo</label>
                    <input type="email" name="user_gmail" className="register-input" placeholder='Correo...' value={formValues.user_gmail} onChange={handleChange}/>
                </div>
                <div className="label-section">
                    <label className='register-label'>Contraseña</label>
                    <input type="password" name="user_password" className="register-input" placeholder='Contraseña...' value={formValues.user_password} onChange={handleChange}/>
                </div>
              </div>
              <div className="button-section">
                <button className="btn-register">Send</button>
              </div>
          </form>
        </div>
      </div>
      {signInError && <p style={{ color: "red" }}>{signInError}</p>}
    </div>
  )
}

export default Register;
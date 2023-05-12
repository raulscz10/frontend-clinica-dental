import React from 'react';
import "./Register.scss";

function Register() {
  return (
    <div className="Register">
      <h1>Registro</h1>
      <div className="main-container">
        <div className="register-container">
          <form noValidate>
              <div className="section-container">
                <div className="label-section">
                    <label className='register-label'>Nombre</label>
                    <input type="text" name="user_name" className="register-input" placeholder='Nombre...'/>
                </div>
                <div className="label-section">
                    <label className='register-label'>Apellidos</label>
                    <input type="text" name="user_surname" className="register-input" placeholder='Apellidos...'/>
                </div>
              </div>
              <div className="section-container">
                <div className="label-section">
                    <label className='register-label'>Edad</label>
                    <input type="number" name="user_age" className="register-input" placeholder='Edad...'/>
                </div>
                <div className="label-section">
                    <label className='register-label'>Telefono</label>
                    <input type="text" name="user_phone" className="register-input" placeholder='Telefono...'/>
                </div>
              </div>
              <div className="section-container">
                <div className="label-section">
                    <label className='register-label'>Correo</label>
                    <input type="email" name="user_gmail" className="register-input" placeholder='Correo...'/>
                </div>
                <div className="label-section">
                    <label className='register-label'>Contraseña</label>
                    <input type="password" name="user_password" className="register-input" placeholder='Contraseña...'/>
                </div>
              </div>
              <div className="button-section">
                <button className="btn-register">Send</button>
              </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;
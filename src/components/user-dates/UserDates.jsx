import React, { useEffect, useState } from "react";
import "./userDates.scss";
import { RiDeleteBin2Line, RiBallPenLine } from "react-icons/ri";
import userService from "../../_services/userService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UserDates({ dates, onChange, dateId, showDeleteIcon }) {
  const [showForm, setShowForm] = useState(false);
  const authState = useSelector((state) => state.auth);
  const id = dates.id;


  useEffect(() => {}, []);

  const handleDelete = async () => {
    try {
      const response = await userService.deleteDate(authState.userToken, dateId);
      window.location.reload();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowForm = () => {
    setShowForm(true);
  };

  return (
    <div className="DatesList">
      <table className="table">
        <thead>
          <tr colSpan={6}>
            <th>
              <div className="tableTitle"> My Dates </div>
            </th>
          </tr>
          <tr className="tr-table">
            <th className="th-table">#</th>
            <th className="th-table">Consulta</th>
            <th className="th-table">Fecha Visita</th>
            <th className="th-table">Horario</th>
            <th className="th-table">Tratamiento</th>
            <th className="th-table" colSpan={2}>
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {dates.map((date) => (
            <tr data-date-id={date.id} key={date.id} onClick={onChange} className="tr-table">
              <td>{date.id}</td>
              <td>{date.inquiries_door}</td>
              <td>{date.date}</td>
              <td>{date.schedule_ini}-{date.schedule_fi}</td>
              <td>{date.name_treatment}</td>
              <td>
                {showDeleteIcon &&(
                  <button className="btn-table update">
                    <RiBallPenLine className="icon" />
                  </button>
                )}
              </td>
              <td>
                {showDeleteIcon &&(
                  <button className="btn-table delete" onClick={handleDelete} >
                    <RiDeleteBin2Line className="icon" />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="createSection">
        <button className="btn-create" onClick={handleShowForm}>Crear Cita</button>
      </div>
      {showForm && (
        <>
          <div className="create-container">
            <form noValidate>
              <h3>Formulario</h3>
              <div className="section-container">
                <div className="label-section">
                  <label className="register-label">Nombre</label>
                  <input
                    type="text"
                    name="user_name"
                    className="register-input"
                    placeholder="Nombre..."
                  />
                </div>
                <div className="label-section">
                  <label className="register-label">Apellidos</label>
                  <input
                    type="text"
                    name="user_surname"
                    className="register-input"
                    placeholder="Apellidos..."
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
                  />
                </div>
                <div className="label-section">
                  <label className="register-label">Telefono</label>
                  <input
                    type="text"
                    name="user_phone"
                    className="register-input"
                    placeholder="Telefono..."
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
                  />
                </div>
                <div className="label-section">
                  <label className="register-label">Contraseña</label>
                  <input
                    type="password"
                    name="user_password"
                    className="register-input"
                    placeholder="Contraseña..."
                  />
                </div>
              </div>
              <div className="button-section">
                <button className="btn-register">Send</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default UserDates;

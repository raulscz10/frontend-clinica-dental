import React, { useEffect, useState } from "react";
import "./userDates.scss";
import { RiDeleteBin2Line, RiBallPenLine } from "react-icons/ri";
import userService from "../../_services/userService";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UserDates({
  dates,
  onChange,
  dateId,
  showIcon,
  schedules,
  treatments,
}) {
  //HOOKS
  const [showForm, setShowForm] = useState(false);

  const [showFormUpdate, setShowFormUpdate] = useState(false);

  const [createError, setCreateError] = useState(null);

  const authState = useSelector((state) => state.auth);

  const isUser = authState.userInfo.role == 3;

  const navigate = useNavigate();

  const initialFormValues = {
    date: "",
    id_treatment: "",
    id_patient: authState.userInfo.id,
    id_schedule: "",
    id_inquiries: 1,
  };

  const [formValues, setFormValues] = useState(initialFormValues);
  const [formValueUpdate, setFormValuesUpdate] = useState({});

  useEffect(() => {
    if (!isUser) {
      navigate("/");
    }
  }, []);

  //Actualizar
  const handleShowFormUpdate = () => {
    setShowFormUpdate(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const credentials = {
      date: formValueUpdate.date,
      id_treatment: formValueUpdate.id_treatment,
      id_patient: authState.userInfo.id,
      id_schedule: formValueUpdate.id,
      id_inquiries: 1,
    };
    console.log(credentials);
    handleUpdateDate(authState.userToken, credentials, dateId);
    //window.location.reload();
  };

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setFormValuesUpdate({
      ...formValues,
      [name]: value, //key: value
    });
  };

  const handleUpdateDate = async (token, credentials, dateId) => {
    try {
      const response = await userService.updateDate(
        token,
        credentials,
        dateId
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //Eliminar
  const handleDelete = async () => {
    try {
      const response = await userService.deleteDate(
        authState.userToken,
        dateId
      );
      window.location.reload();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //Crear
  const handleShowForm = () => {
    setShowForm(true);
  };

  const handleHiddeForm = () => {
    setShowForm(false);
  };

  const handleCreate = (e) => {
    e.preventDefault();
    const credentials = {
      date: formValues.date,
      id_treatment: formValues.id_treatment,
      id_patient: authState.userInfo.id,
      id_schedule: formValues.id_schedule,
      id_inquiries: 1,
    };
    createUserDate(authState.userToken, credentials);
    window.location.reload();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value, //key: value
    });
  };

  const createUserDate = async (token, credentials) => {
    try {
      const response = await userService.createUserDate(token, credentials);
      setCreateError(null);
    } catch (error) {
      console.log(error); //TODO
      setCreateError(error);
    }
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
            <tr
              data-date-id={date.id}
              key={date.id}
              onClick={onChange}
              className="tr-table"
            >
              <td>{date.id}</td>
              <td>{date.inquiries_door}</td>
              <td>{date.date}</td>
              <td>
                {date.schedule_ini}-{date.schedule_fi}
              </td>
              <td>{date.name_treatment}</td>
              <td>
                {showIcon && dateId &&(
                  <button
                    className="btn-table update"
                    onClick={handleShowFormUpdate}
                  >
                    <RiBallPenLine className="icon" />
                  </button>
                )}
              </td>
              <td>
                  {showIcon && dateId &&(
                    <button className="btn-table delete" onClick={handleDelete}>
                      <RiDeleteBin2Line className="icon" />
                    </button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!showForm && (
        <div className="createSection">
          <button className="btn-create" onClick={handleShowForm}>
            Crear Cita
          </button>
        </div>
      )}
      {showForm && (
        <div className="createSection">
          <button className="btn-create" onClick={handleHiddeForm}>
            Crear Cita
          </button>
        </div>
      )}
      {showForm && (
        <>
          <div className="create-container">
            <form noValidate onSubmit={handleCreate}>
              <h3>Formulario Crear Cita</h3>
              <div className="section-container">
                <div className="label-section">
                  <label className="register-label">Fecha</label>
                  <div>
                    <input
                      type="date"
                      name="date"
                      className="register-input"
                      value={formValues.date}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="label-section">
                  <label className="register-label">Tratamiento</label>
                  <div>
                    <select
                      name="id_treatment"
                      className="register-input"
                      onChange={handleChange}
                    >
                      <option value={formValues.id_treatment}>
                        Selecciona una opción
                      </option>
                      {treatments.map((treatment, index) => (
                        <option key={index} value={treatment.id}>
                          {treatment.name_treatment}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="label-section">
                  <label className="register-label">Horario</label>
                  <div>
                    <select
                      name="id_schedule"
                      className="register-input"
                      onChange={handleChange}
                    >
                      <option>
                        Selecciona una opción
                      </option>
                      {schedules.map((schedule, index) => (
                        <option key={index} value={schedule.id_schedule}>
                          {schedule.schedule_ini}-{schedule.schedule_fi}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="button-section">
                <button className="btn-register">Send</button>
              </div>
            </form>
          </div>
          {createError && <p style={{ color: "red" }}>{createError}</p>}
        </>
      )}
      {showFormUpdate && (
        <>
          <div className="create-container">
            <form noValidate onSubmit={handleUpdate}>
              <h3>Formulario Actualizar Cita</h3>
              <div className="section-container">
                <div className="label-section">
                  <label className="register-label">Fecha Cita</label>
                  <div>
                    <input
                      type="date"
                      name="date"
                      className="register-input"
                      value={formValueUpdate.date}
                      onChange={handleChangeUpdate}
                    />
                  </div>
                </div>
                <div className="label-section">
                  <label className="register-label">Tratamiento</label>
                  <div>
                  <select
                      name="id_treatment"
                      className="register-input"
                      onChange={handleChange}
                    >
                      <option value={formValueUpdate.id_treatment}>
                        Selecciona una opción
                      </option>
                      {treatments.map((treatment, index) => (
                        <option key={index} value={treatment.id}>
                          {treatment.name_treatment}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="label-section">
                  <label className="register-label">Horario</label>
                  <div>
                  <select
                      name="id_schedule"
                      className="register-input"
                      onChange={handleChange}
                    >
                      <option value={formValueUpdate.id_schedule}>
                        Selecciona una opción
                      </option>
                      {schedules.map((schedule, index) => (
                        <option key={index} value={schedule.id}>
                          {schedule.schedule_ini}-{schedule.schedule_fi}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="button-section">
                <button className="btn-register">Send</button>
              </div>
            </form>
          </div>
          {createError && <p style={{ color: "red" }}>{createError}</p>}
        </>
      )}
    </div>
  );
}

export default UserDates;

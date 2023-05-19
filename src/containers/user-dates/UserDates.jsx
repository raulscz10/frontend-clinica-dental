import React, { useEffect, useState } from "react";
import "./UserDates.scss";
import { UserDate } from "../../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../../_services/userService";
import infoService from "../../_services/infoService";

function UserDates() {
  //HOOKS
  //Información Auth
  const navigate = useNavigate();
  const authState = useSelector((state) => state.auth);
  const isUser = authState.userInfo.role == 3;

  //Información Citas
  const [dates, setDates] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [treatments, setTreatments] = useState([]);
  const [dateId, setDateId] = useState();

  //Información Mostrar Formularios
  const [showIcon, setShowIcon] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showFormUpdate, setShowFormUpdate] = useState(false);
  const [showFormDelete, setFormDelete] = useState(false);

  const initialFormValues = {
    date: "",
    id_treatment: "",
    id_patient: authState.userInfo.id,
    id_schedule: "",
    id_inquiries: 1,
  };

  const [formValueUpdate, setFormValuesUpdate] = useState({});
  const [formValues, setFormValues] = useState(initialFormValues);
  const [createError, setCreateError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

  useEffect(() => {
    if (isUser) {
      getAllDatesUsers(authState.userToken, authState.userInfo.id);
      getAllTreatments();
      getAllSchedules();
    } else {
      navigate("/");
    }
  }, []);

  //Información De Citas
  const getAllSchedules = async () => {
    try {
      const response = await infoService.getAllSchedules();
      setSchedules(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTreatments = async () => {
    try {
      const response = await infoService.getAllTreatments();
      setTreatments(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllDatesUsers = async (token, id) => {
    try {
      const response = await userService.getAllDatesUsers(token, id);
      setDates(response);
    } catch (error) {
      console.log(error);
    }
  };

  const newDates = (dates) =>
    dates.map((date) => {
      date.name_treatment = date.treatment.name_treatment;
      date.schedule_ini = date.schedule.schedule_ini;
      date.schedule_fi = date.schedule.schedule_fi;
      date.inquiries_door = date.inquirie.inquiries_door;
      return date;
    });

  const handleUsersDate = (e) => {
    const { dateId } = e.currentTarget.dataset;
    handleSingleUser(dateId);
  };

  const handleSingleUser = (dateId) => {
    setShowIcon(true);
    setDateId(dateId);
    handleShowFormUpdate();
    handleShowFormDelete();
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
      getAllTreatments();
      getAllSchedules();
      getAllDatesUsers(authState.userToken, authState.userInfo.id);
    } catch (error) {
      setCreateError(error);
    }
  };

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
      id_schedule: formValueUpdate.id_schedule,
      id_inquiries: 1,
    };

    handleUpdateDate(authState.userToken, credentials, dateId);
  };

  const handleChangeUpdate = (e) => {
    const { name, value } = e.target;
    setFormValuesUpdate({
      ...formValueUpdate,
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
      setUpdateError(null);
      getAllTreatments();
      getAllSchedules();
      getAllDatesUsers(authState.userToken, authState.userInfo.id);
    } catch (error) {
      setUpdateError(error);
    }
  };

  //Eliminar
  const handleShowFormDelete = () => {
    setFormDelete(true);
  };

  const handleDelete = async () => {
    try {
      const response = await userService.deleteDate(
        authState.userToken,
        dateId
      );
      getAllTreatments();
      getAllSchedules();
      getAllDatesUsers(authState.userToken, authState.userInfo.id);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isUser && (
        <>
          <h1>Mis Citas</h1>
          <UserDate
            showIcon={showIcon}
            dateId={dateId}
            dates={newDates(dates)}
            onChange={handleUsersDate}
            schedules={schedules}
            treatments={treatments}
          />
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
                            <option value={formValues.id_schedule}>
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
          {showFormUpdate && (
            <>
              <div className="create-container">
                <form noValidate onSubmit={handleUpdate}>
                  <h3>Formulario Actualizar Cita {dateId}</h3>
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
                          onChange={handleChangeUpdate}
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
                          onChange={handleChangeUpdate}
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
              {updateError && <p style={{ color: "red" }}>{updateError}</p>}
            </>
          )}
          {showFormDelete &&(
            <>
              <div className="delete-container">
                <form noValidate onSubmit={handleDelete}>
                  <h3  >Formulario Borrar Cita {dateId}</h3>
                  <div className="section-container">
                    <div className="label-section">
                      <label className="register-label">¿Desea Borrar La Cita?</label>
                    </div>
                  </div>
                  <div className="button-section">
                    <button className="btn-register">Send</button>
                  </div>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default UserDates;

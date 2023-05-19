import React, { useEffect, useState } from "react";
import "./userDates.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function UserDates({
  dates,
  onChange,
}) {
  //HOOKS
  const authState = useSelector((state) => state.auth);

  const isUser = authState.userInfo.role == 3;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isUser) {
      navigate("/");
    }
  }, [dates]);

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserDates;

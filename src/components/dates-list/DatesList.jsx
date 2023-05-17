import React from "react";
import "./DatesList.scss";
import { dateFormat } from "../../_util/util";

function DatesList({ dates }) {
  return (
    <div className="DatesList">
      <table className="table">
        <thead>
          <tr colSpan={6}>
            <th>
              <div className="tableTitle"> Dates </div>
            </th>
          </tr>
          <tr className="tr-table">
            <th className="th-table">#</th>
            <th className="th-table">Fecha Visita</th>
            <th className="th-table">Tratamiento</th>
            <th className="th-table">Paciente</th>
            <th className="th-table">Horario</th>
          </tr>
        </thead>
        <tbody>
          {dates.map((date) => (
            <tr key={date.id} className="tr-table">
              <td>{date.id}</td>
              <td>{dateFormat(date.date)}</td>
              <td>{date.name_treatment}</td>
              <td>{date.user_name} {date.user_surname}</td>
              <td>{date.schedule_ini}-{date.schedule_fi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DatesList;

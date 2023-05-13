import React from 'react';
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
                <th className="th-table">Consulta</th>
              </tr>
            </thead>
            <tbody>
              {dates.map((date) => (
                <tr key={date.id} className="tr-table">
                  <td>{date.id}</td>
                  <td>
                    {dateFormat(date.date)}
                  </td>
                  <td>{date.id_treatment}</td>
                  <td>{date.id_patient}</td>
                  <td>{date.id_schedule}</td>
                  <td>{date.id_inquiries}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default DatesList;

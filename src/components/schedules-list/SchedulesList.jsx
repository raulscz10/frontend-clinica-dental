import React from "react";
import "./SchedulesList.scss";

function SchedulesList({ schedules }) {
  return (
    <div className="SchedulesList">
      <table className="table">
        <thead>
          <tr colSpan={3}>
            <th>
              <div className="tableTitle"> Horario </div>
            </th>
          </tr>
          <tr className="tr-table">
            <th className="th-table">#</th>
            <th className="th-table">Horario Ini</th>
            <th className="th-table">Horario Final</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((schedule) => (
            <tr key={schedule.id} className="tr-table">
              <td>{schedule.id}</td>
              <td>{schedule.schedule_ini}</td>
              <td>{schedule.schedule_fi}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SchedulesList;

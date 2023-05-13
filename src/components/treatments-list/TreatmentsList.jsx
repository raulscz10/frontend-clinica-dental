import React from "react";
import "./TreatmentsList.scss";

function TreatmentsList({ treatments }) {
  return (
    <div className="TreatmentsList">
      <table className="table">
        <thead>
          <tr colSpan={2}>
            <th>
              <div className="tableTitle"> Tratamientos </div>
            </th>
          </tr>
          <tr className="tr-table">
            <th className="th-table">#</th>
            <th className="th-table">Name</th>
          </tr>
        </thead>
        <tbody>
          {treatments.map((treatment) => (
            <tr key={treatment.id} className="tr-table">
              <td>{treatment.id}</td>
              <td>{treatment.name_treatment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TreatmentsList;

import React from "react";
import "./InquiriesList.scss";

function InquiriesList({ inquiries }) {
  return (
    <div className="InquiriesList">
      <table className="table">
        <thead>
          <tr colSpan={3}>
            <th>
              <div className="tableTitle"> Consultas </div>
            </th>
          </tr>
          <tr className="tr-table">
            <th className="th-table">#</th>
            <th className="th-table">Puerta</th>
            <th className="th-table">Doctor</th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquirie) => (
            <tr key={inquirie.id} className="tr-table">
              <td>{inquirie.id}</td>
              <td>{inquirie.inquiries_door}</td>
              <td>{inquirie.id_doctor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InquiriesList;

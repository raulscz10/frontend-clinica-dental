import React from "react";
import "./DirectionsList.scss";

function DirectionsList({ directions }) {
  return (
    <div className="DirectionsList">
      <table className="table">
        <thead>
          <tr colSpan={4}>
            <th>
              <div className="tableTitle"> Direcciones </div>
            </th>
          </tr>
          <tr className="tr-table">
            <th className="th-table">#</th>
            <th className="th-table">Calle</th>
            <th className="th-table">Número</th>
            <th className="th-table">Código Postal</th>
          </tr>
        </thead>
        <tbody>
          {directions.map((direction) => (
            <tr key={direction.id} className="tr-table">
              <td>{direction.id}</td>
              <td>
                {direction.street}
              </td>
              <td>{direction.number}</td>
              <td>{direction.postal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DirectionsList;

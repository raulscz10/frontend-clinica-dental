import React from "react";
import "./RolesList.scss";

function RolesList({ roles }) {
  return (
    <div className="RolesList">
      <table className="table">
        <thead>
          <tr colSpan={2}>
            <th>
              <div className="tableTitle"> Roles </div>
            </th>
          </tr>
          <tr className="tr-table">
            <th className="th-table">#</th>
            <th className="th-table">Name</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((rol) => (
            <tr key={rol.id} className="tr-table">
              <td>{rol.id}</td>
              <td>{rol.name_rol}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RolesList;

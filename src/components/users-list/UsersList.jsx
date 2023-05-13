import React from 'react';
import "./UsersList.scss";


function UsersList({users}) {
  //console.log(users);
  return (
    <div className="UsersList">
      <table className="table">
        <thead>
          <tr colSpan={5}>
            <th>
              <div className="tableTitle"> Users </div>
            </th>
          </tr>
          <tr className="tr-table">
            <th className="th-table">#</th>
            <th className="th-table">Name & Surname</th>
            <th className="th-table">Edad</th>
            <th className="th-table">Telefono</th>
            <th className="th-table">Gmail</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="tr-table">
              <td>{user.id}</td>
              <td>
                {user.user_name} {user.user_surname}
              </td>
              <td>{user.user_age}</td>
              <td>{user.user_phone}</td>
              <td>{user.user_gmail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;

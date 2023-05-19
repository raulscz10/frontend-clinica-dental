import React from "react";
import "./Header.scss";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateAuthStoreStateLogOut } from "../../features/authentication/updateAuthState";
import {
  MdPersonOutline,
  MdOutlineLogout,
  MdOutlineLogin,
  MdOutlineArrowDownward,
} from "react-icons/md";

import { RiAdminLine, RiHome4Line } from "react-icons/ri";

function Header() {
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const isLoggedIn = authState.isLoggedIn;
  const { name, role } = authState.userInfo;
  const isAdmin = role == 1;
  const isUser = role == 3;

  //Handlers
  const handleLogout = () => {
    updateAuthStoreStateLogOut();
    navigate("/");
  };

  return (
    <div className="Header">
      <nav className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/">
              <RiHome4Line className="icon home" />
              Home
            </NavLink>
          </li>
          {isAdmin && (
            <>
              <li className="nav-item">
                <NavLink to="/admin">
                  <RiAdminLine className="icon admin" />
                  Admin
                </NavLink>
              </li>
            </>
          )}
          {isUser && (
            <>
              <li className="nav-item">
                <NavLink to="/citas">
                  Citas
                </NavLink>
              </li>
            </>
          )}
          <li className="nav-item">
            <NavLink to="/about">About <span className="none">Us</span></NavLink>
          </li>
        </ul>
        <ul className="navbar-nav">
          {!isLoggedIn && (
            <>
              <li className="nav-item">
                <NavLink to="/login">
                  <MdOutlineLogin className="icon login" />
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/register">Registro</NavLink>
              </li>
            </>
          )}
          {isLoggedIn && (
            <>
              <li className="nav-item dropdown">
                <a>
                  {name}
                  <MdOutlineArrowDownward className="icon" />
                </a>
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <NavLink to="/profile">
                      <MdPersonOutline className="icon myProfile" />
                      Profile
                    </NavLink>
                  </li>
                  <li className="dropdown-item">
                    <a onClick={handleLogout}>
                      <MdOutlineLogout className="icon logout" />
                      Logout
                    </a>
                  </li>
                </ul>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;

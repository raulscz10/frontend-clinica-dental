import React, { useEffect, useState } from "react";
import "./Login.scss";
import authService from "../../_services/authService";
import tokenStorageService from "../../_services/tokenStorageService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAuthStoreStateLogIn } from "../../features/authentication/updateAuthState";
import logoImage from "../../../public/images/logo.jpg";

function Login() {
  const initialFormValues = {
    user_gmail: "eugeni@admin.com",
    user_password: "root",
  };

  // HOOKS
  const [formValues, setFormValues] = useState(initialFormValues);

  const [loginError, setLoginError] = useState(null);

  const authState = useSelector((state) => state.auth);

  const isAdmin = authState.userInfo.role == 1;

  const navigate = useNavigate();

  useEffect(() => {
    if (authState.userToken) {
      isAdmin ? navigate("/admin") : navigate("/");
    }
  }, [authState.userToken]);

  // HANDLERS
  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      user_gmail: formValues.user_gmail,
      user_password: formValues.user_password,
    };
    login(credentials);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value, //key: value
    });
  };

  // FUNCTIONS
  const login = async (credentials) => {
    try {
      const response = await authService.login(credentials);
      const token = response.token;
      setLoginError(null);
      updateAuthStoreStateLogIn(token);
    } catch (error) {
      console.log(error);
      setLoginError(error.response.data.message);
    }
  };

  // RETURN
  return (
    <div className="Login">
      <h1>Login</h1>
      <div className="main-container">
        <div className="login-container">
          <form noValidate onSubmit={handleSubmit}>
            <div className="form-login">
              <label htmlFor="" className="label-login">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="user_gmail"
                value={formValues.user_gmail}
                onChange={handleChange}
                className="input-login"
              />
            </div>
            <div className="form-login">
              <label htmlFor="" className="label-login">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="user_password"
                value={formValues.user_password}
                onChange={handleChange}
                className="input-login"
              />
            </div>
            <div className="form-login">
              <button className="btn-login">Send</button>
            </div>
          </form>
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        </div>
        <div className="container-image">
          <img src={logoImage} alt="" className="logoImage"/>
        </div>
      </div>
    </div>
  );
}

export default Login;

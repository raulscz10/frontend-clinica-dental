import React, { useEffect, useState } from "react";
import "./Login.scss";
import authService from "../../_services/authService";
import tokenStorageService from "../../_services/tokenStorageService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateAuthStoreStateLogIn } from "../../features/authentication/updateAuthState";

function Login() {
  const initialFormValues = {
    email: "admin@admin.com",
    password: "12345678",
  };

  // HOOKS
  const [formValues, setFormValues] = useState(initialFormValues);

  const [loginError, setLoginError] = useState(null);

  const authState = useSelector((state) => state.auth);

  const isAdmin = authState.userInfo.role == "admin";

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
      email: formValues.email,
      password: formValues.password,
    };
    login(credentials);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
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
      //tokenStorageService.save(token);
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
      <div className="login-container">
        <form noValidate onSubmit={handleSubmit}>
          <div className="form-login">
            <label htmlFor="" className="label-login">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formValues.email}
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
              type="text"
              name="password"
              value={formValues.password}
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
    </div>
  );
}

export default Login;

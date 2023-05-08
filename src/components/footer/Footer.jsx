import React from "react";
import "./Footer.scss";

function Footer() {
  return (
    <div className="Footer">
      <div className="footer-container">
        <h2>Clinica Dental Sol</h2>
        <div className="flex-cv">
          <div className="logo-zone">
            <p>Hello world</p>
            <img src="" alt="" className="" />
          </div>
          <div className="footer-content">
            <div className="content-container-one">
              <p>
                <a>Instagram</a>
              </p>
              <p>
                <a>Twitter</a>
              </p>
              <p>780568432</p>
              <p>sol@clinicadental.com</p>
            </div>
            <div className="content-container-two"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

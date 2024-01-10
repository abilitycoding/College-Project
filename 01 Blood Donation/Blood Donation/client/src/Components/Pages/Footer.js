import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faYoutube,
  faGithub,
  faWhatsapp,
  faTelegram
} from "@fortawesome/free-brands-svg-icons";
import { FaArrowCircleUp } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="Footer_Main_Container" bg="dark" data-bs-theme="dark">
      <footer className="cds-footer px-3">
        <div className="cds-footer-container cds-footer-row">
          <div className="cds-footer-col">
            <h4>Life Blood</h4>
            <ul className="cds-footer-ul">
              <li>
                <a href="/about-us">About us</a>
              </li>
              <li>
                <a href="/privacy-policy">privacy Policy</a>
              </li>

              <li>
                <a href="/terms&condition">Terms & Condition</a>
              </li>
            </ul>
          </div>

          <div className="cds-footer-col">
            <h4>Blood Donation</h4>
            <ul className="cds-footer-ul">
              <li>
                <a href="/bootcamps">Donate Now</a>
              </li>
              <li>
                <a href="/disclaimer">Need Blood</a>
              </li>
            </ul>
          </div>
          <div className="cds-footer-col">
            <h4>follow us</h4>
            <div className="social-links">
              <div className="Brand_Logo d-flex gap-3 justify-content-start align-items-center pb-3">
                <img src="/logo.png" alt="   " width={60} />
                <h4 className="m-0 d-flex flex-row flex-nowrap">Life Blood</h4>
              </div>
              <a href="https://www.facebook.com/lifeblood">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://twitter.com/lifeblood">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://www.instagram.com/lifeblood">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://www.linkedin.com/in/lifeblood">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p
            className="m-0 Footer_copyRight p-2"
            style={{ textAlign: "center", fontSize: "14px", color: "#888" }}
          >
            &copy; {new Date().getFullYear()} Life Blood. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

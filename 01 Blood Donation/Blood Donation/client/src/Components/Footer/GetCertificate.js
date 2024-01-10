import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function GetCertificate() {
  return (
    <div className="bg-dark register_container overflow-y-scroll">
      <Container className="p-5 min-vh-100" >
        <h1 className="text-center mb-4 text-decoration-underline text-info">
          Internship Certificate's
        </h1>
        <div className="d-flex justify-content-center">
          <img
            src={`/certificate-super-intern.jpg`}
            alt="..."
            className="super_Intern_certificate"
            width="50%"
          />
        </div>
        <Container className="text-white py-5">
          <span>
            <span className="fs-5 text-warning">*Note: </span>
            To earn the "Super Intern Certificate" during the four-month full
            stack bootcamp, students must maintain 90% attendance, complete 90%
            of projects, and successfully pass all assessments. This certificate
            signifies high-level skills and commitment.
            <p className="p-3 code-pink-color">
              <span className="fs-5 text-warning">* Master </span> in HTML, CSS,
              Bootstrap, Javascript, React, Redux, Node JS, Express JS, MongoDb,
              Mysql, AWS, Hosting, Domain, API, DataStructure, Algorithm,
              GitHub, Git, vs code, NPM, Rest Api, HTTP
            </p>
          </span>
        </Container>
        <Row className="d-flex gap-5">
          <Col md={12} lg={5}>
            <Row>
              <img
                src={`/certificate-frontend.jpg`}
                alt="..."
                width="100%"
              />
            </Row>
            <Row>
              <span className="text-white p-3">
                <span className="fs-5 text-warning">*Note: </span>
                To earn the "Frontend Development Certificate," students must
                maintain 90% attendance, complete 90% of projects, pass all
                assessments, and exhibit creative design proficiency. This
                certificate highlights their expertise in frontend development
                with a touch of artistic finesse.
                <p className="p-3 code-pink-color">
                  <span className="fs-5 text-warning">* Master </span> in HTML,
                  CSS, Bootstrap, Javascript, React, Redux
                </p>
              </span>
            </Row>
          </Col>
          <Col md={12} lg={5}>
            <Row>
              <img
                src={`/certificate-backend.jpg`}
                alt="..."
                width="100%"
              />
            </Row>
            <Row>
              <span className="text-white p-3">
                <span className="fs-5 text-warning">*Note: </span>
                To earn the "Super Intern Certificate" during the four-month
                full stack bootcamp, students must maintain 90% attendance,
                complete 90% of projects, and successfully pass all assessments.
                This certificate signifies high-level skills and commitment.
                <p className="p-3 code-pink-color">
                  <span className="fs-5 text-warning">* Master </span> in Node
                  JS, Express JS, MongoDb, Mysql, AWS, Hosting
                </p>
              </span>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default GetCertificate;

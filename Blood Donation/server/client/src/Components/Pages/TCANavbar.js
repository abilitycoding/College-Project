import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import "./Navbar.css";

const TCANavbar = () => {
  return (
    <Container fluid className="TCA_Navbar position-fixed z-3 p-0">
      <Navbar
        collapseOnSelect
        expand="md"
        className="p-0 ps-4"
        bg="dark"
        data-bs-theme="dark"
      >
        <Container>
          <Navbar.Brand
            href="#home"
            className="fw-bold fs-6 d-flex justify-content-center align-items-center gap-3"
          >
            <img src="/logo.png" alt="" width={50} height={60} />
            Life Blood
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="w-100 d-flex justify-content-end align-items-center gap-3">
              <Nav.Link href="#home_section">Home</Nav.Link>
              <Nav.Link href="#learn_section">Learn More</Nav.Link>
              <Nav.Link href="#Blood_Type_section">Blood Type</Nav.Link>
              <a href="#Register_section" class="bn3">
                Donate Now
              </a>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
};

export default TCANavbar;

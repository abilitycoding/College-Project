import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function NewsNavbar() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      bg="dark"
      variant="dark"
      className="px-4"
    >
      <Container className="d-flex flex-row">
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center text-white gap-2 m-0"
        >
          <img
            src="https://i.pinimg.com/236x/94/0c/d6/940cd69e9bb247f9e4ec4fc567973c53.jpg"
            alt=""
            className="mr-2 rounded-circle"
            style={{ width: "50px", height: "50px" }}
          />
          Nutri Guide
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav className="d-flex gap-3">
            <Button variant="light" href="/">
              Home
            </Button>
            <Button variant="light" href="/bmi">
              BMI Check
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NewsNavbar;

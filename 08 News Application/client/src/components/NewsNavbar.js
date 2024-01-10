import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUpModal = ({ show, handleClose }) => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "location") {
      setFormData({ ...formData, location: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    setValidationErrors({ ...validationErrors, [e.target.name]: "" });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, location: selectedOption.value });
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.name) {
      errors.name = "Name is required";
    }

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(`${BACKEND_URL}/signup`, formData);
        if (response.status === 200) {
          alert("Successfully SignUp");
          handleClose();
        }

        console.log(response);

        // You can handle success scenario here, e.g., redirect or show a success message
      } catch (error) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Sign Up</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex align-items-center">
        <Form className="w-100">
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              name="name"
              onChange={handleChange}
              isInvalid={validationErrors.name}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
              isInvalid={validationErrors.email}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
              isInvalid={validationErrors.password}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.password}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="w-100" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" className="w-100" onClick={handleSignUp}>
          Sign Up
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const LoginModal = ({ show, handleClose }) => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [loginError, setLoginError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear validation error when user starts typing
    setValidationErrors({ ...validationErrors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(`${BACKEND_URL}/login`, formData);
        if (response.status === 200) {
          handleClose();
          localStorage.setItem("userName", response.data.user.name);
        }
        console.log(response.data);
        // You can handle success scenario here, e.g., redirect or show a success message
      } catch (error) {
        console.error(error.response.data);
        setLoginError("Invalid email or password. Please try again.");
        // You can handle error scenario here, e.g., show an error message
        setTimeout(() => {
          setLoginError(null);
        }, 2000);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex align-items-center">
        <Form className="w-100">
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
              isInvalid={validationErrors.email}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
              isInvalid={validationErrors.password}
            />
            <Form.Control.Feedback type="invalid">
              {validationErrors.password}
            </Form.Control.Feedback>
          </Form.Group>

          {loginError && (
            <Alert variant="danger" className="mt-3">
              {loginError}
            </Alert>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" className="w-100" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" className="w-100" onClick={handleLogin}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function NewsNavbar() {
  const navigate = useNavigate();
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const userName = localStorage.getItem("userName");

  const handleSignUpModalOpen = () => {
    setShowSignUpModal(true);
  };

  const handleSignUpModalClose = () => {
    setShowSignUpModal(false);
  };

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginModalOpen = () => {
    setShowLoginModal(true);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("userName");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        fixed="top"
        bg="dark"
        variant="dark"
        className="px-4"
      >
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center text-white gap-2"
        >
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/007/539/914/small/news-logo-design-vector.jpg"
            alt=""
            className="mr-2 rounded-circle"
            style={{ width: "30px", height: "30px" }}
          />
          UP-TO-NEWS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" className="nav-link text-white">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/business" className="nav-link text-white">
              Business
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/entertainment"
              className="nav-link text-white"
            >
              Entertainment
            </Nav.Link>
            <Nav.Link as={Link} to="/general" className="nav-link text-white">
              General
            </Nav.Link>
            <Nav.Link as={Link} to="/health" className="nav-link text-white">
              Health
            </Nav.Link>
            <Nav.Link as={Link} to="/science" className="nav-link text-white">
              Science
            </Nav.Link>
            <Nav.Link as={Link} to="/sports" className="nav-link text-white">
              Sports
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/technology"
              className="nav-link text-white"
            >
              Technology
            </Nav.Link>
          </Nav>
          <Nav>
            {userName && (
              <h3 className="pe-3 text-center">Welcome {userName}</h3>
            )}
            {userName ? (
              <div className="mx-3">
                <Button className="w-100 px-3" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Nav.Link onClick={handleSignUpModalOpen}>SignUp</Nav.Link>
                <Nav.Link onClick={handleLoginModalOpen}>
                  Already have an account?{" "}
                  <span className=" text-decoration-underline">Login</span>
                </Nav.Link>
              </>
            )}
            <div className="mx-3">
              <Button
                className="alert_btn w-100"
                variant="danger"
                href="/alert"
              >
                Alert
              </Button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <SignUpModal
        show={showSignUpModal}
        handleClose={handleSignUpModalClose}
      />
      <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} />
    </>
  );
}

export default NewsNavbar;

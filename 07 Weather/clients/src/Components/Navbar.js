import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "./Navbar.css"

const SignUpModal = ({ show, handleClose }) => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    location: ""
  });

  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const districts = [
    { label: "Ariyalur", value: "Ariyalur" },
    { label: "Chengalpattu", value: "Chengalpattu" },
    { label: "Chennai", value: "Chennai" },
    { label: "Coimbatore", value: "Coimbatore" },
    { label: "Cuddalore", value: "Cuddalore" },
    { label: "Dharmapuri", value: "Dharmapuri" },
    { label: "Dindigul", value: "Dindigul" },
    { label: "Erode", value: "Erode" },
    { label: "Kallakurichi", value: "Kallakurichi" },
    { label: "Kancheepuram", value: "Kancheepuram" },
    { label: "Karur", value: "Karur" },
    { label: "Krishnagiri", value: "Krishnagiri" },
    { label: "Madurai", value: "Madurai" },
    { label: "Mayiladuthurai", value: "Mayiladuthurai" },
    { label: "Nagapattinam", value: "Nagapattinam" },
    { label: "Namakkal", value: "Namakkal" },
    { label: "Nilgiris", value: "Nilgiris" },
    { label: "Perambalur", value: "Perambalur" },
    { label: "Pudukkottai", value: "Pudukkottai" },
    { label: "Ramanathapuram", value: "Ramanathapuram" },
    { label: "Ranipet", value: "Ranipet" },
    { label: "Salem", value: "Salem" },
    { label: "Sivaganga", value: "Sivaganga" },
    { label: "Tenkasi", value: "Tenkasi" },
    { label: "Thanjavur", value: "Thanjavur" },
    { label: "Theni", value: "Theni" },
    { label: "Thoothukudi", value: "Thoothukudi" },
    { label: "Tiruchirappalli", value: "Tiruchirappalli" },
    { label: "Tirunelveli", value: "Tirunelveli" },
    { label: "Tirupathur", value: "Tirupathur" },
    { label: "Tiruppur", value: "Tiruppur" },
    { label: "Tiruvallur", value: "Tiruvallur" },
    { label: "Tiruvannamalai", value: "Tiruvannamalai" },
    { label: "Tiruvarur", value: "Tiruvarur" },
    { label: "Vellore", value: "Vellore" },
    { label: "Viluppuram", value: "Viluppuram" },
    { label: "Virudhunagar", value: "Virudhunagar" }
  ];

  const handleDistrictSelect = (selectedOption) => {
    setSelectedDistrict(selectedOption);
  };

  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    if (e.target.name === "location") {
      setSelectedDistrict(e.target.value);
      setFormData({ ...formData, location: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    setValidationErrors({ ...validationErrors, [e.target.name]: "" });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, location: selectedOption.value });
    handleDistrictSelect(selectedOption);
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

    if (selectedDistrict == null) {
      errors.location = "Location is required";
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

          <Form.Group controlId="formLocation">
            <Form.Label>Location</Form.Label>
            <Select
              value={selectedDistrict}
              onChange={handleSelectChange}
              options={districts}
              placeholder="Select District"
            />
            <Form.Control.Feedback type="invalid" style={{ display: "block" }}>
              {validationErrors.location}
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

function WeatherNavbar() {
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
        className="bg-body-tertiary position-absolute top-0 start-0 end-0"
      >
        <Container>
          <Navbar.Brand href="#home">Weather Man</Navbar.Brand>
          <img
            src="https://www.pngall.com/wp-content/uploads/11/Weather-PNG-Images.png"
            width={40}
            alt="  "
          />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {userName && <h3 className="pe-3 text-center">Welcome {userName}</h3>}
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
                <Button className="alert_btn w-100" variant="danger" href="/alert">
                  Alert
                </Button>
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <SignUpModal
        show={showSignUpModal}
        handleClose={handleSignUpModalClose}
      />
      <LoginModal show={showLoginModal} handleClose={handleLoginModalClose} />
    </>
  );
}

export default WeatherNavbar;

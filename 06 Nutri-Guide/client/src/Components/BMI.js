import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Bmi = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);

  const calculateBMI = () => {
    const heightInMeters = parseFloat(height) / 100; // Convert height to meters
    const weightInKg = parseFloat(weight);

    if (
      isNaN(heightInMeters) ||
      isNaN(weightInKg) ||
      heightInMeters <= 0 ||
      weightInKg <= 0
    ) {
      alert("Please enter valid height and weight.");
      return;
    }

    const calculatedBmi = weightInKg / (heightInMeters * heightInMeters);
    setBmi(calculatedBmi.toFixed(2));
  };

  return (
    <Container className="home_box mt-5">
      <h1 className="text-center mb-4 text-info">BMI Calculator</h1>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Form>
            <Form.Group controlId="formHeight">
              <Form.Label className="text-white">Height (cm)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter height in centimeters"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formWeight">
              <Form.Label className="text-white">Weight (kg)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter weight in kilograms"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </Form.Group>

            <Button variant="light" className="mt-3" onClick={calculateBMI}>
              Calculate BMI
            </Button>
          </Form>
        </Col>
      </Row>

      {bmi !== null && (
        <>
          <Row className="justify-content-center mt-4">
            <Col xs={12} md={6} className="bg-dark rounded-3">
              <h3 className="text-white p-3">Your BMI: {bmi}</h3>
              <p className="lead">
                Interpretation:
                {bmi < 18.5
                  ? " Underweight"
                  : bmi < 25
                  ? " Normal weight"
                  : bmi < 30
                  ? " Overweight"
                  : " Obesity"}
              </p>
            </Col>
          </Row>
          <div className="d-flex justify-content-center rounded-3">
            <img
              src="https://i.pinimg.com/564x/9b/01/d5/9b01d5730cac614493833bffaa921624.jpg"
              alt=""
              className="p-3 img-fluid"
            />
          </div>
        </>
      )}
    </Container>
  );
};

export default Bmi;
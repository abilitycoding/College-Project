import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Col, Row, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/Loginpage.css";
const Login = () => {
  const img =
    "https://www.moneypatrol.com/moneytalk/wp-content/uploads/2023/06/budget324.png";
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/users/login", values);
      setLoading(false);
      message.success("Login success!");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong!");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <>
      <Container className="vh-100 d-flex justify-content-center align-items-center">
        {loading && <Spinner />}
        <div>
          <Row>
            <h1 className=" text-center pb-3">Expense Management System</h1>
          </Row>
          <Row className="p-3">
            <Col xs={12} md={6}>
              <img src={img} alt="login-img" width={"100%"} height="100%" />
            </Col>
            <Col xs={12} md={6} className="login-form">
              <Form layout="vertical" onFinish={submitHandler}>
                <h1>Login Form</h1>
                <Form.Item label="Email" name="email">
                  <Input type="email" required />
                </Form.Item>
                <Form.Item label="Password" name="password">
                  <Input type="password" required />
                </Form.Item>
                <div className="d-flex justify-content-between">
                  <Link to="/register">
                    Not a user? Click here to Regsiter!
                  </Link>
                  <button className="btn">Login</button>
                </div>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default Login;

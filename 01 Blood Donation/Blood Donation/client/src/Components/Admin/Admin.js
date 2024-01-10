import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import {
  Table,
  Button,
  Form,
  Pagination,
  Row,
  Col,
  Dropdown,
  Modal,
  Container
} from "react-bootstrap";
import axios from "axios";
import CCSpinner from "../Pages/Spinner";
import { BsUpload } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import "./Admin.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  userEmail,
  LogoutHandleDeclaration
} from "../Redux/ReduxUserData/UserDataAction";

function MyVerticallyCenteredModal({ show, onHide, userData, dataRefresh }) {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const [data, setData] = useState({
    name: "",
    phoneNumber: "",
    city: "",
    bloodType: ""
  });

  console.log(userData);

  // When userData is available, populate the data object
  useEffect(() => {
    if (userData) {
      setData((prevData) => ({
        ...prevData,
        name: userData.name || "",
        phoneNumber: userData.phoneNumber || "",
        city: userData.city || "",
        bloodType: userData.bloodType || ""
      }));
    }
  }, [userData]);

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = () => {
    const { name, phoneNumber, city, bloodType } = data;
    return name && bloodType && phoneNumber && city;
  };

  const handleRegister = () => {
    if (!validateForm()) {
      toast("Please fill out all required fields.", {
        type: "error",
        autoClose: 1500
      });
      setFormSubmitted(true);
    } else {
      axios
        .put(`${BACKEND_URL}/user-update/${userData._id}`, data)
        .then((res) => {
          console.log(res.data.message);
          if (res.data.message === "User updated successfully") {
            toast("User data updated successfully", {
              type: "success",
              autoClose: 1500
            });
            setTimeout(() => {
              onHide();
              dataRefresh();
            }, 1500);
          }
        })
        .catch(() => {
          console.log("An error occurred in Update User");
        });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const resetData = () => {
    setData({
      name: userData.name || "",
      bloodType: userData.bloodType || "",
      phoneNumber: userData.phoneNumber || "",
      city: userData.city || ""
    });
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        onHide(); // Close the modal
        resetData(); // Reset the data state
      }}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
        <Form className="w-100">
          <Form.Group className="mb-3" controlId="formName">
            <Form.Control
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              isInvalid={!data.name && formSubmitted}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter Name.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formPhoneNumber">
            <Form.Control
              type="number"
              name="phoneNumber"
              value={data.phoneNumber}
              onChange={handleChange}
              isInvalid={!data.phoneNumber && formSubmitted}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter Phone Number.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Control
              type="text"
              name="city"
              value={data.city}
              onChange={handleChange}
              isInvalid={!data.city && formSubmitted}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter City.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBloodType">
            <Form.Control
              as="select"
              name="bloodType"
              value={data.bloodType}
              onChange={handleChange}
              isInvalid={!data.bloodType && formSubmitted}
              required
            >
              <option value="" disabled>
                Choose Blood Type
              </option>
              {bloodTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              Please choose a blood type.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="w-100 d-flex flex-column justify-content-center gap-3">
            <Button
              className="newBatchBookButton pr-4 bg-blue-500 rounded-md text-white text-xl"
              onClick={handleRegister}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

const BootCampAdmin = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  console.log("BACKEND_URL: ", BACKEND_URL);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState(10);
  const reduxUserData = useSelector((state) => state.userData.userEmail);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [user, setUser] = useState({
    userEmail: "",
    userPassword: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleLogin = () => {
    axios
      .post(`${BACKEND_URL}/login`, user)
      .then((res) => {
        console.log(res.data.userEmail);
        dispatch(userEmail(res.data.userEmail));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDropdownSelect = (value) => {
    setUserData(value);
  };

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const debouncedSearch = debounce((query) => {
    const filteredUsers = users.filter((user) => {
      return user.bloodType.toLowerCase().includes(query.toLowerCase());
    });
    setDisplayedUsers(filteredUsers);
  }, 500);

  function handleSearchChange(e) {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  }

  const fetchUserData = () => {
    setLoading(true);
    axios
      .get(`${BACKEND_URL}/get-users`)
      .then((res) => {
        setUsers(res.data);
        setDisplayedUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line
  }, []);

  const deleteUser = (userId) => {
    axios
      .delete(`${BACKEND_URL}/user-delete/${userId}`)
      .then((res) => {
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        toast("User deleted successfully", {
          type: "success",
          autoClose: 1500
        });
        setTimeout(() => {
          fetchUserData();
        }, 1500);
      })
      .catch((err) => {
        toast("Failed to delete user!", {
          type: "error",
          autoClose: 1500
        });
      });
  };

  if (loading) {
    return <CCSpinner />;
  }

  /* Pagination */

  const itemsPerPage = userData; // Show only one user per page

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = displayedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(displayedUsers.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationItems = () => {
    let items = [];
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  const handleLogout = () => {
    dispatch(LogoutHandleDeclaration);
    navigate("/");
  };

  return (
    <div
      className="Admin_Container bg-dark vh-100 overflow-hidden"
      data-bs-theme="dark"
    >
      {reduxUserData == "admin@gmail.com" ? (
        <Container className="Admin_Main_Box  bg-dark pt-5 mt-5">
          <Row className="Header_Box_Admin  bg-dark">
            <Col
              sm={12}
              md={6}
              className="d-flex justify-content-center align-items-center"
            >
              <Form.Control
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search By Blood Group..."
                className="rounded-1 mw-100"
              />
            </Col>
            <Col
              sm={12}
              md={6}
              className="Admin_Settings d-flex justify-content-end gap-3 align-items-center"
            >
              <Dropdown data-bs-theme="dark">
                <Dropdown.Toggle
                  id="dropdown-button-dark-example1"
                  variant="secondary"
                  className="d-flex justify-content-center align-items-center"
                >
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    height="16px"
                    width="20px"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mb-1 me-1"
                  >
                    <path d="M21.063 15L14.78 15 13 15 13 17 14.78 17 21.063 17 22 17 22 15zM4 7H15V9H4zM4 11H15V13H4zM4 15H11V17H4z"></path>
                  </svg>
                  {userData}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleDropdownSelect(10)}
                    active={userData === 10}
                  >
                    10
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDropdownSelect(25)}
                    active={userData === 25}
                  >
                    25
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDropdownSelect(50)}
                    active={userData === 50}
                  >
                    50
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleDropdownSelect(100)}
                    active={userData === 100}
                  >
                    100
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Button onClick={fetchUserData}>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  version="1"
                  viewBox="0 0 48 48"
                  enableBackground="new 0 0 48 48"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g fill="#ffffff">
                    <path d="M13,13c0-3.3,2.7-6,6-6h10c3.3,0,6,2.7,6,6h4c0-5.5-4.5-10-10-10H19C13.5,3,9,7.5,9,13v11.2h4V13z"></path>
                    <polygon points="4.6,22 11,30.4 17.4,22"></polygon>
                  </g>
                  <g fill="#ffffff">
                    <path d="M35,35c0,3.3-2.7,6-6,6H19c-3.3,0-6-2.7-6-6H9c0,5.5,4.5,10,10,10h10c5.5,0,10-4.5,10-10V23h-4V35z"></path>
                    <polygon points="30.6,26 37,17.6 43.4,26"></polygon>
                  </g>
                </svg>
              </Button>
              <Button onClick={handleLogout}>Logout</Button>
            </Col>
          </Row>
          <Row>
            <br></br>
          </Row>
          <Row className="Body_Box_Admin">
            {currentUsers.length > 0 && (
              <div className="Table_Container">
                <Table striped hover className="Table_Content">
                  <thead className="Table_Heading">
                    <tr className="">
                      <th>#</th>
                      <th>Name</th>
                      <th>Blood Type</th>
                      <th>Phone</th>
                      <th>City</th>
                      <th>
                        <BsUpload />
                      </th>
                      <th>
                        <AiOutlineDelete />
                      </th>
                    </tr>
                  </thead>
                  <tbody className="Table_body">
                    {currentUsers.map((user, index) => (
                      <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.bloodType}</td>
                        <td>{user.phoneNumber}</td>
                        <td>{user.city}</td>
                        <td>
                          <BsUpload onClick={() => setModalShow(user)} />
                          <MyVerticallyCenteredModal
                            show={modalShow !== false} // Check if modalShow is not false (i.e., user data is passed)
                            onHide={() => setModalShow(false)}
                            userData={modalShow} // Pass the user data as a prop to the modal
                            dataRefresh={fetchUserData}
                          />
                        </td>
                        <td>
                          <AiOutlineDelete
                            onClick={() => deleteUser(user._id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </Row>
          <Row className="Footer_Box_Admin">
            <Pagination className="d-flex justify-content-center align-items-center p-3 m-0">
              {renderPaginationItems()}
            </Pagination>
            <ToastContainer />
          </Row>
        </Container>
      ) : (
        <Container className="Register_container vh-100 d-flex justify-content-center align-items-center">
          <Row className="Register_container_Row d-flex justify-content-center align-items-center">
            <Col className="Register_container_Login_Col bg-white p-5 border rounded shadow d-flex flex-column justify-content-center align-items-center w-25">
              <Form className="bg-white" data-bs-theme="light">
                <div className="d-flex justify-content-center pb-3">
                  <img
                    src="./login.gif"
                    className="img-fluid"
                    width="150px"
                    height="150px"
                  />
                </div>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Control
                    type="text"
                    name="userEmail"
                    value={user.userEmail}
                    onChange={handleChange}
                    placeholder="Enter your Email"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                  <div className="input-group">
                    <Form.Control
                      type={showPassword ? "text" : "password"} // Use showPassword state
                      name="userPassword"
                      value={user.userPassword}
                      onChange={handleChange}
                      placeholder="Enter your Password"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </div>
                </Form.Group>
                <div className="d-flex justify-content-center">
                  <Button
                    onClick={handleLogin}
                    className="bg-primary h-10 rounded-md text-white text-xl"
                  >
                    Login
                  </Button>
                  <ToastContainer />
                </div>
              </Form>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      )}
    </div>
  );
};

export default BootCampAdmin;

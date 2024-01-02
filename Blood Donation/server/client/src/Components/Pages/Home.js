import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { FaDownload, FaWhatsapp } from "react-icons/fa";
import Footer from "./Footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css";
import TCANavbar from "./TCANavbar";
import "./Home.css";

const Register = () => {
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const scrollRef = useRef(null);
  const [user, setUser] = useState({
    name: "",
    bloodType: "",
    phoneNumber: "",
    city: ""
  });

  console.log("User: ", user);

  const [formSubmitted, setFormSubmitted] = useState(false);

  const validateForm = () => {
    const { name, email, phoneNumber, city, bloodType } = user;
    if (!name || !email || !phoneNumber || !city || !bloodType) {
      return false;
    }
    return true;
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast("Please fill out all required fields.", {
        type: "error",
        autoClose: 1500
      });
      setFormSubmitted(true);
      return;
    }
    console.log(user);

    axios
      .post(`${BACKEND_URL}/user-register`, user)
      .then((res) => {
        if (res.data.message === "User already registered") {
          toast("User already registered", {
            type: "error",
            autoClose: 1500
          });
        } else if (
          res.data.message ===
          "Successfully registered our Team will Connect with you Soon"
        ) {
          // Display the toast for "Successfully registered"
          toast("Successfully Registered", {
            type: "success",
            autoClose: 1500
          });
          setUser({
            name: "",
            bloodType: "",
            phoneNumber: "",
            city: "",
            userType: ""
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  });
  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const data = [
    {
      name: `Whole Blood Donation`,
      img: `https://t4.ftcdn.net/jpg/02/21/47/99/360_F_221479946_2yUmWRmVPBka6d4zcXbBhJbRra8WcpQV.jpg`,
      review: `A whole blood donation is the most common type of donation, and can help save up to three lives.`,
      eligibility: `Ages 16 and older, in good health, with and meet other donation requirements of Users.`
    },
    {
      name: `Double Red Cell Donation`,
      img: `https://images.squarespace-cdn.com/content/v1/5967c8616b8f5b53565aaf62/1506684919634-9W2THQEWE0C9WP2WN4KD/image-asset.jpeg?format=1500w`,
      review: `collects two units of red cells while returning most of the plasma and platelets to the donor.`,
      eligibility: `Ages 17 and older, weigh at least 130 pounds, in good health.`
    },
    {
      name: `Platelet Donation`,
      img: `https://npr.brightspotcdn.com/dims4/default/1511618/2147483647/strip/true/crop/4496x3000+0+0/resize/880x587!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Fd2%2F95%2F57312a3e414bb60e8498c06a47e7%2Ffairfield-donors.JPG`,
      review: `Platelets are critical for cancer patients, organ transplants, and other lifesaving medical treatments.`,
      eligibility: `Ages 17 and older, in good health, and meet other donation requirements`
    },
    {
      name: `Plasma Donation`,
      img: `https://www.kcpipernews.com/wp-content/uploads/2019/11/Blood-Drive110719MR001-900x600.jpg`,
      review: `Plasma is used to treat burn victims, patients with severe infections, and other medical conditions.`,
      eligibility: `Ages 18 and older, in good health, and meet other donation requirements.`
    },
    {
      name: `Whole Blood Donation`,
      img: `https://t4.ftcdn.net/jpg/02/21/47/99/360_F_221479946_2yUmWRmVPBka6d4zcXbBhJbRra8WcpQV.jpg`,
      review: `A whole blood donation is the most common type of donation, and can help save up to three lives.`,
      eligibility: `Ages 16 and older, in good health, with and meet other donation requirements of Users.`
    },
    {
      name: `Double Red Cell Donation`,
      img: `https://images.squarespace-cdn.com/content/v1/5967c8616b8f5b53565aaf62/1506684919634-9W2THQEWE0C9WP2WN4KD/image-asset.jpeg?format=1500w`,
      review: `collects two units of red cells while returning most of the plasma and platelets to the donor.`,
      eligibility: `Ages 17 and older, weigh at least 130 pounds, in good health.`
    },
    {
      name: `Platelet Donation`,
      img: `https://npr.brightspotcdn.com/dims4/default/1511618/2147483647/strip/true/crop/4496x3000+0+0/resize/880x587!/quality/90/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2Fd2%2F95%2F57312a3e414bb60e8498c06a47e7%2Ffairfield-donors.JPG`,
      review: `Platelets are critical for cancer patients, organ transplants, and other lifesaving medical treatments.`,
      eligibility: `Ages 17 and older, in good health, and meet other donation requirements`
    },
    {
      name: `Plasma Donation`,
      img: `https://www.kcpipernews.com/wp-content/uploads/2019/11/Blood-Drive110719MR001-900x600.jpg`,
      review: `Plasma is used to treat burn victims, patients with severe infections, and other medical conditions.`,
      eligibility: `Ages 18 and older, in good health, and meet other donation requirements.`
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ],
    autoplay: true,
    autoplaySpeed: 2000
  };

  const bloodType = [
    {
      type: "A+",
      canDonateTo: ["A+", "AB+"],
      canReceiveFrom: ["A+", "A-", "O+", "O-"]
    },
    {
      type: "A-",
      canDonateTo: ["A+", "A-", "AB+", "AB-"],
      canReceiveFrom: ["A-", "O-"]
    },
    {
      type: "B+",
      canDonateTo: ["B+", "AB+"],
      canReceiveFrom: ["B+", "B-", "O+", "O-"]
    },
    {
      type: "B-",
      canDonateTo: ["B+", "B-", "AB+", "AB-"],
      canReceiveFrom: ["B-", "O-"]
    },
    {
      type: "AB+",
      canDonateTo: ["AB+"],
      canReceiveFrom: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
    },
    {
      type: "AB-",
      canDonateTo: ["AB+", "AB-"],
      canReceiveFrom: ["A-", "B-", "AB-", "O-"]
    },
    {
      type: "O+",
      canDonateTo: ["A+", "B+", "AB+", "O+"],
      canReceiveFrom: ["O+", "O-"]
    },
    {
      type: "O-",
      canDonateTo: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      canReceiveFrom: ["O-"]
    }
  ];

  return (
    <div className="register_container bg-light text-dark" ref={scrollRef}>
      <TCANavbar className="sticky-navbar position-fixed top-0" />
      <section id="home_section" className="intro-section pt-5">
        <Container className="position-sticky top-0 z-1">
          <Row className=" mt-4">
            <Col className="w-75">
              <h1 className="display-1 mt-5">
                <span className="position-relative css-1msn28t">
                  Save Lives,
                  <img
                    src="/images/headline-curve.svg"
                    alt=""
                    className="improve-img  position-absolute top-100 bottom-0 start-0 end-0"
                    width="100%"
                  />
                </span>{" "}
                by <br /> Donating Blood{" "}
                <span className="css-19dcp59 position-relative">
                  <span className="skill-svg">
                    <svg version="1.1" viewBox="0 0 3183 3072" width={40}>
                      <g id="Layer_x0020_1">
                        <path
                          fill="#dc3545"
                          d="M2600 224c0,0 0,0 0,0 236,198 259,562 52,809 -254,303 -1849,2089 -2221,1776 -301,-190 917,-1964 1363,-2496 207,-247 570,-287 806,-89z"
                        ></path>
                        <path
                          fill="#dc3545"
                          d="M3166 2190c0,0 0,0 0,0 64,210 -58,443 -270,516 -260,90 -1848,585 -1948,252 -104,-230 1262,-860 1718,-1018 212,-73 437,39 500,250z"
                        ></path>
                        <path
                          fill="#dc3545"
                          d="M566 3c0,0 0,0 0,0 -219,-26 -427,134 -462,356 -44,271 -255,1921 90,1962 245,62 628,-1392 704,-1869 36,-221 -114,-424 -332,-449z"
                        ></path>
                      </g>
                    </svg>
                  </span>
                </span>
              </h1>
              <p className="fs-3 mt-5">
                <span className="blood_text">Every donation</span> is critical
                and you can make a lifesaving difference. Blood donation
                improves or <span className="blood_text">saves lives</span> and
                enhances social solidarity.
              </p>
              <div className=" d-flex gap-3 mt-5">
                <a href="#form_section" class="bn3">
                  Looking For Blood
                </a>
                <a
                  href="https://www.lifeblood.com/"
                  target="_blank"
                  class="bn4"
                >
                  Donate Now
                </a>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="p-xs-5 d-flex justify-content-center align-items-center h-100">
                <img
                  src="/BloodDonation.png"
                  alt="..."
                  className="img-fluid rounded-3"
                />
              </div>
            </Col>
          </Row>
          <Row className="my-5 bg-body-tertiary rounded-4 cnt_1">
            <div className="text-danger fs-2 fw-semibold  text-center p-4 d-flex justify-content-center align-items-center">
              "Donating blood is not just giving blood, it's giving life. Be a
              hero – donate blood."
            </div>
          </Row>
        </Container>
      </section>
      <section id="learn_section" className="most-popular-course p-md-5">
        <h3 className="text-center text-danger pt-5 pb-3">
          Learn About Donation
        </h3>
        <Container>
          <Row className="p-3 p-lg-5">
            <Col className="w-75">
              <Slider {...settings}>
                {data.map((d) => (
                  <Card key={d.name} style={{ width: "18rem" }}>
                    <Card.Img src={d.img} alt="" variant="top" />
                    <Card.Body>
                      <Card.Title className="text-danger fw-bold">
                        {d.name}
                      </Card.Title>
                      <Card.Text className="card-description">
                        {d.review}
                      </Card.Text>
                      <Card.Text className="card-description">
                        <span className="text-danger fw-bold">
                          Eligibility:
                        </span>{" "}
                        {d.eligibility}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>
      <section id="Blood_Type_section" className="promo-section">
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <img
                src="https://www.pngitem.com/pimgs/m/147-1477661_blood-transfusion-clipart-logo-transparent-blood-donation-hd.png"
                alt=""
                srcset=""
                className=" img-fluid"
              />
            </Col>
            <Col
              xs={12}
              md={6}
              className="d-flex flex-column justify-content-center"
            >
              <Row>
                <h1 className=" display-3">
                  Make your{" "}
                  <span className="position-relative css-1msn28t">
                    First Donation
                    <img
                      src="/images/headline-curve.svg"
                      alt=""
                      className="improve-img  position-absolute top-100 bottom-0 start-0 end-0"
                      width="100%"
                    />
                  </span>{" "}
                  Enjoyable{" "}
                </h1>
                <p>
                  <strong>
                    "The joy of saving lives runs in your veins. Donate blood."
                  </strong>
                </p>
              </Row>
              <Row className="my-3">
                <table className="table bordered table-striped">
                  <thead className="">
                    <tr>
                      <th className="p-2 text-center text-white bg-danger border">
                        Blood Type
                      </th>
                      <th className="p-2 text-center text-white bg-danger border">
                        Can Donate To
                      </th>
                      <th className="p-2 text-center text-white bg-danger border">
                        Can Receive From
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bloodType.map((donor) => (
                      <tr key={donor.bloodType}>
                        <td className="p-2 text-center border">{donor.type}</td>
                        <td className="p-2 text-center border">
                          {donor.canDonateTo.join(", ")}
                        </td>
                        <td className="p-2 text-center border">
                          {donor.canReceiveFrom.join(", ")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>
      <section id="Register_section" className="form-section">
        <Container>
          <Row>
            <Col className="py-5 d-flex justify-content-center align-items-center" xs={12} md={12} lg={6}>
              <img src="/Donate.jpg" width="420px" alt="" className="shadow-lg rounded-4" />
            </Col>
            <Col className="p-0 d-flex justify-content-center align-items-center">
              <Container className="d-flex justify-content-center align-items-center">
                <Form
                  className="w-auto form-padding p-md-5 p-sm-3 my-5 shadow-lg rounded-4"
                  autoComplete="off"
                >
                  <h3 className="text-center pb-5 pt-3">Register Here to Donate</h3>
                  <Row>
                    <Col xs={12} md={6}>
                      <Form.Group className="mb-3" controlId="formName">
                        <Form.Control
                          type="text"
                          name="name"
                          value={user.name}
                          placeholder="Name"
                          onChange={handleChange}
                          isInvalid={!user.name && formSubmitted}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your name.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBloodType">
                        <Form.Control
                          as="select"
                          name="bloodType"
                          value={user.bloodType}
                          onChange={handleChange}
                          isInvalid={!user.bloodType && formSubmitted}
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
                      <Form.Group
                        className="mb-3"
                        controlId="formReEnterPassword"
                      >
                        <Form.Control
                          type="number"
                          name="phoneNumber"
                          value={user.phoneNumber}
                          placeholder="Phone Number"
                          onChange={handleChange}
                          isInvalid={!user.phoneNumber && formSubmitted}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your phone number.
                        </Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group
                        className="mb-3"
                        controlId="formReEnterPassword"
                      >
                        <Form.Control
                          type="text"
                          name="city"
                          value={user.city}
                          placeholder="City"
                          onChange={handleChange}
                          isInvalid={!user.city && formSubmitted}
                          required
                        />
                        <Form.Control.Feedback type="invalid">
                          Please enter your city.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col
                      xs={12}
                      md={6}
                      className=" d-flex flex-column gap-3 justify-content-center"
                    >
                      <Button
                        className="newBatchBookButton w-100 text-white"
                        onClick={handleRegister}
                      >
                        Submit
                      </Button>
                      <a href={`Brochure-FSWD.pdf`} download>
                        <Button className="newBatchBookButton1 w-100 text-white">
                          Download Rules <FaDownload />
                        </Button>
                      </a>
                      <a
                        href="https://chat.whatsapp.com/ItkNVSHvyqX4XadomsjeUy"
                        target="_blank"
                      >
                        <Button className="w-100" variant="success">
                          Urgent Chat
                          <FaWhatsapp />
                        </Button>
                      </a>
                    </Col>
                  </Row>
                  <ToastContainer />
                </Form>
              </Container>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer scrollRef={scrollRef} />
    </div>
  );
};

export default Register;

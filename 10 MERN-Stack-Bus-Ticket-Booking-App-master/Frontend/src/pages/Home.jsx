import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { message } from "antd";
import Bus from "../components/Bus";
import { Row, Col } from "antd";

function Home() {
  const [buses, setBuses] = useState([]);
  const [filters = {}, setFilters] = useState({});
  const tempFilters = {};
  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      tempFilters[key] = filters[key];
    }
  });
  const dispatch = useDispatch();
  const getBuses = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/buses/get-all-buses",
        tempFilters
      );

      dispatch(HideLoading());
      if (response.data.success) {
        setBuses(response.data.data);
      } else {
        dispatch(HideLoading());
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  useEffect(() => {
    getBuses();
  }, []);
  return (
    <>
      <div>
        <div className="my-3 p-2  ">
          <Row gutter={10}>
            <Col lg={6} sm={24} className=" my-3">
              <input
                type="text"
                name=""
                id=""
                placeholder="From"
                value={filters.from}
                onChange={(e) =>
                  setFilters({ ...filters, from: e.target.value })
                }
              />
            </Col>
            <Col lg={6} sm={24}  className=" my-3">
              <input
                type="text"
                name=""
                id=""
                placeholder="To"
                value={filters.to}
                onChange={(e) => setFilters({ ...filters, to: e.target.value })}
              />
            </Col>
            <Col lg={6} sm={24}  className=" my-3">
              <input
                type="date"
                name=""
                id=""
                placeholder="Journey Date"
                value={filters.journeyDate}
                onChange={(e) =>
                  setFilters({ ...filters, journeyDate: e.target.value })
                }
              />
            </Col>
            <div className="d-flex gap-5 justify-content-center align-items-center">
              <Col lg={6} sm={24}>
                <button className="secondary-btn bg-primary" onClick={() => getBuses()}>
                  Filter{" "}
                </button>
              </Col>
              <Col lg={6} sm={24}>
                <button
                  className="primary-btn bg-danger"
                  onClick={() => {
                    getBuses();
                    setFilters({
                      from: "",
                      to: "",
                      journeyDate: "",
                    });
                  }}
                >
                  CLEAR{" "}
                </button>
              </Col>
            </div>
          </Row>
        </div>
      </div>
      <div>
        <Row gutter={(10, 10)}>
          {buses
            .filter((bus) => bus.status === "Yet To Start")
            .map((bus) => {
              return (
                <Col lg={12} xs={24} sm={24}>
                  <Bus bus={bus} />
                </Col>
              );
            })}
        </Row>
      </div>
    </>
  );
}

export default Home;

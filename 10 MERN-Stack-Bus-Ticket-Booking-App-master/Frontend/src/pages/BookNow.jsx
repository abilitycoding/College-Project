import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../helpers/axiosInstance";
import { HideLoading, ShowLoading } from "../redux/alertSlice";
import { message } from "antd";
import { Row, Col } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import SeatSelection from "../components/SeatSelection";
import axios from "axios";
import StripeCheckout from 'react-stripe-checkout';

function BookNow() {
  const [bus, setBus] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const params = useParams();
  const getBus = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/get-bus-by-id", {
        _id: params.id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        setBus(response.data.data);
      } else {
        dispatch(HideLoading());
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const bookNow = async (transactionId) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/bookings/book-now", {
        bus: bus._id,
        seats: selectedSeat,
        transactionId : transactionId
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        navigate('/bookings')
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onToken = async(token) => {
    try {
      dispatch(ShowLoading())
      const response = await axiosInstance.post('/api/bookings/make-payment' ,{
        token :token,
        amount : bus.fare * selectedSeat.length * 100,
      })
      dispatch(HideLoading())
      if (response.data.success){
        message.success(response.data.message)
        bookNow(response.data.data.transactionId)
      }
      else{
        dispatch(HideLoading())
        message.error(response.data.message)
      }
    } catch (error) {
      dispatch(HideLoading())
      message.error(error.message)
    }
  }
  useEffect(() => {
    getBus();
    console.log("Heloo", bus);
  }, []);

  return (
    <div className='mx-7'>
      {bus ? (
        <Row className="mt-3" gutter={20}>
          <Col lg={12} xs={24} sm={24}>
            <p className="text-2xl primary-text"> {bus.name}</p>
            <p className="text-md mt-2">
              {bus.from} - {bus.to}
            </p>
            <hr />

            <div className="d-flex flex-column gap-3F">
              <p className="text-lg">
                {" "}
                <b>Journey Date</b> : {bus.journeyDate}{" "}
              </p>
              <p className="text-lg">
                {" "}
                <b>Fare</b> : $ {bus.fare} /-{" "}
              </p>
              <p className="text-lg">
                {" "}
                <b>Departure Time</b> : {bus.departure}{" "}
              </p>
              <p className="text-lg">
                {" "}
                <b>Arrival Time</b> : {bus.arrival}
              </p>
              <p className="text-lg">
                {" "}
                <b>Capacity</b> : {bus.capacity}
              </p>
              <p className="text-lg">
                {" "}
                <b>Seats Left</b> : {bus.capacity - bus.seatsBooked.length}
              </p>
            </div>
            <hr />
            <div className="d-flex flex-column gap-2">
              <p className="text-xl mt-3">
                <b className="text-xl">Seat Number : </b>
                {selectedSeat.join(" , ")}
              </p>
              <p className="text-xl  mt-3">
                <b className="text-xl">Fare : </b>₹ {" "}
                {Number(bus.fare) * selectedSeat.length} /-
              </p>
              <StripeCheckout
                billingAddress
                amount={bus.fare * selectedSeat.length * 100}
                token={onToken}
                currency="INR"
                stripeKey="pk_test_51NvoKxSEVGFNrfXGghuEPouGyWBSXafpmfwXUM6AVDWQBlqCbAOzhNePzE70VaNVkVbBuApBAFOBhdnQ17LnMrHt00sZy2ZhlX"
              >
                <button
                  className={` ${
                    selectedSeat == 0 ? "disabled-btn" : "secondary-btn"
                  }  mt-2`}
                  // onClick={bookNow}
                >
                  Book Now
                </button>
              </StripeCheckout>
            </div>
          </Col>
          <Col lg={12} xs={24} sm={24}>
            <SeatSelection
              selectedSeat={selectedSeat}
              setSelectedSeat={setSelectedSeat}
              bus={bus}
            />
          </Col>
        </Row>
      ) : null}
    </div>
  );
}

export default BookNow;

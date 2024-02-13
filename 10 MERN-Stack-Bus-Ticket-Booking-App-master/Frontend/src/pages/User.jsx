import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux"; // Import the useDispatch hook
import { ShowLoading, HideLoading } from "../redux/alertSlice"; // Import your Redux actions
import { axiosInstance } from "../helpers/axiosInstance";
import { message } from "antd";

function User() {
  const [user, setUser] = useState();
  const dispatch = useDispatch(); // Get the dispatch function from Redux
  const [bookings, setBookings] = useState(null);
  let mappedData;
  const getUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/users/get-single-user",
        {}
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setUser(response.data.data);
      } else {
        dispatch(HideLoading());
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  const getBookings = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/bookings/get-bookings-by-userid",
        {}
      );

      dispatch(HideLoading());
      if (response.data.success) {
        setBookings(response.data.data);
        console.log(response.data.id);

        mappedData = response.data.data
          .filter((booking) => booking.user._id === response.data.id)
          .map((booking) => {
            return {
              ...booking,
              ...booking.bus,
              key: booking._id,
            };
          });

        setBookings(mappedData);

        // message.success(response.data.message)
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
    getUser(); // Call the getUser function to fetch user data
    getBookings(); // Call the getBookings function to fetch Booking data
  }, []);

  return (
    <div className=" card p-3">
      {/* Render user data here */}
      {user && (
        <div className="d-flex flex-column gap-3" >
          <p className="text-lg">
            <b className="text-lg">Name : </b> {user.name}
          </p>
          <p className="text-lg">
            <b className="text-lg">Email : </b> {user.email}
          </p>
          {/* Add more user details as needed */}
          <h1 className="text-lg">
            <b className="text-lg">Bookings : </b>{" "}
            
          </h1>
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="card p-3 mt-2">
                  <h1 className="text-lg primary-text">
                    <b>{booking.bus.name}</b>
                  </h1>
                  <hr />
                  <div className="d-flex justify-content-between gap-2">
                    <div>
                      <p className="text-sm">From : </p>
                      <p className="text-sm">{booking.bus.from}</p>
                    </div>
                    <div>
                      <p className="text-sm">To : </p>
                      <p className="text-sm">{booking.bus.to}</p>
                    </div>
                    <div>
                      <p className="text-sm">Transaction id : </p>
                      <p className="text-sm">${booking.transactionId}</p>
                    </div>
                    <div>
                      <p className="text-sm">Journey Date : </p>
                      <p className="text-sm">{booking.bus.journeyDate}</p>
                    </div>
                    <div>
                      <p className="text-sm">Departure Time : </p>
                      <p className="text-sm">{booking.bus.departure}</p>
                    </div>
                  </div>
                  
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default User;

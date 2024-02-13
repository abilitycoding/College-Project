import React, { useEffect, useRef, useState } from "react";
import PageTitle from "../components/PageTitle";
import BusForm from "../components/BusForm";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../redux/alertSlice";
import { axiosInstance } from "../helpers/axiosInstance";
import { Table, message } from "antd";
import { Modal } from "antd";
import { useReactToPrint } from "react-to-print";


function Booking() {
  const dispatch = useDispatch();
  const [showPrintModel, setShowPrintModel] = useState(false);
  const [seletedTicket, setSelectedTicket] = useState(null);
  const [bookings, setBookings] = useState(null);
  let mappedData;
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
        console.log(response.data.id)
        if (window.location.pathname === "/admin/bookings") {
          console.log(window.location.pathname)
          mappedData = response.data.data.map((booking) => {
            return {
              ...booking,
              ...booking.bus,
              key: booking._id,
            };
          });
          console.log(mappedData)
        }
        else{
          mappedData = response.data.data.filter((booking) => booking.user._id === response.data.id).map((booking) => {
            return {
              ...booking,
              ...booking.bus,
              key: booking._id,
            };
          });
        }
       
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

  const column = [
    {
      title: "Bus Name",
      dataIndex: "name",
      key: "bus",
    },
    {
      title: "Bus Number",
      dataIndex: "number",
      key: "bus",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      title: "Journey Time",
      dataIndex: "departure",
    },
    {
      title: "Seats",
      dataIndex: "seats",
      render : (seats) => seats.join(",")
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div>
          <p
            className="text-md underline"
            onClick={() => {
              setSelectedTicket(record);
              setShowPrintModel(true);
            }}
          >
            Print Ticket
          </p>
        </div>
      ),
    },
  ];

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    getBookings();
  },[]);

  return (
    <div>
      <PageTitle title="Bookings" />
      <Table columns={column} dataSource={bookings} />

      {showPrintModel && (
        <Modal
          title="Print Ticket"
          onCancel={() => {
            setSelectedTicket(null);
            setShowPrintModel(false);
          }}
          open={showPrintModel}
          okText = "Print"
          onOk={handlePrint}
        >
          <div className="d-flex flex-column p-3" ref={componentRef}>
            <p className="text-md"> {seletedTicket.name} </p>
            <p className="text-md  ">
              {seletedTicket.from} - {seletedTicket.to}
            </p>

            <hr />
            <p className="text-sm ">Date : {seletedTicket.journeyDate}</p>
            <p className="text-sm ">
              Departure Time : {seletedTicket.departure}
            </p>
            <p className="text-sm ">Arrival Time : {seletedTicket.arrival}</p>

            <hr />
            <p className="text-md">Seats : {seletedTicket.seats.length}</p>

            <hr />
            <p className="text-md ">
              Amount : {seletedTicket.fare * seletedTicket.seats.length}
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Booking;

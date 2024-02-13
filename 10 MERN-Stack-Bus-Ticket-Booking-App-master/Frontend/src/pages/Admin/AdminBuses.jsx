import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import BusForm from "../../components/BusForm";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/alertSlice";
import { axiosInstance } from "../../helpers/axiosInstance";

import { Table, message } from "antd";
function AdminBuses() {
  const [showBusForm, setShowBusForm] = useState(false);
  const [buses, setBuses] = useState([]);
  const [selectedBus, setSelectedBus] = useState(null);
  const dispatch = useDispatch();

  const getBuses = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/get-all-buses", {});
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

  const deleteBus = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/buses/delete-bus", {_id : id});
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message)
        getBuses()
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
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
    },
    {
      title: "From",
      dataIndex: "from",
    },
    {
      title: "To",
      dataIndex: "to",
    },
    {
      title: "Journey Date",
      dataIndex: "journeyDate",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (action, record) => {
        return (
          <div className="d-flex gap-3">
            <i class="ri-delete-bin-line" onClick={() => {
              deleteBus(record._id)
            }}></i>
            <i
              class="ri-pencil-line"
              onClick={() => {
                setSelectedBus(record);
                setShowBusForm(true);
               
              }}
            ></i>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getBuses();
    
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between my-3">
        <PageTitle title="BUSES" />
        <button className="primary-btn" onClick={() => {setShowBusForm(true)
        }}>
          ADD BUS
        </button>
      </div>
      <Table
        columns={column}
        dataSource={buses}
       
      />

      {showBusForm && (
        <BusForm
          showBusForm={showBusForm}
          setShowBusForm={setShowBusForm}
          type={selectedBus ? "edit" : "add"}
          selectedBus={selectedBus}
          getData = {getBuses}
          setSelectedBus = {setSelectedBus}
        />
      )}
    </div>
  );
}

export default AdminBuses;

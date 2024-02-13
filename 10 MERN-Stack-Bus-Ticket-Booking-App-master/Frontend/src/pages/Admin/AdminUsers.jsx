import React, { useEffect, useState } from "react";
import PageTitle from "../../components/PageTitle";
import BusForm from "../../components/BusForm";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../../redux/alertSlice";
import { axiosInstance } from "../../helpers/axiosInstance";

import { Table, message } from "antd";
function AdminBuses() {
  const [users, setUsers] = useState([]);

  const dispatch = useDispatch();

  const getUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await axiosInstance.post("/api/users/get-all-users", {});
      dispatch(HideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
      } else {
        dispatch(HideLoading());
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const updateUserPermission = async (user, action) => {
    try {

      let payload = null
      if(action === "make-admin"){
        payload = {
          ...user,
          isAdmin : true
        }
      }
      else if(action === "remove-admin"){
        payload = {
          ...user,
          isAdmin : false
        }
      }
      else if(action === "block"){
        payload = {
          ...user,
          isBlocked : true
        }
      }
      else if(action === "unblock"){
        payload = {
          ...user,
          isBlocked: false
        }
      }
      

      dispatch(ShowLoading());
      const response = await axiosInstance.post(
        "/api/users/update-user-permission",
        payload
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setUsers(response.data.data);
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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "",
      render: (data) => {
        if (data.isAdmin) {
          return " ADMIN ";
        } else {
          return " USER ";
        }
      },
    },

    
  ];

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="USERS" />
      </div>
      <Table columns={column} dataSource={users} />
    </div>
  );
}

export default AdminBuses;

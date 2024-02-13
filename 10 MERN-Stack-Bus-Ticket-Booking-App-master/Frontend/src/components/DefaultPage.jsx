import React, { useState } from "react";
import "../resources/layout.css";
import Item from "antd/es/list/Item";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function DefaultPage({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  let activeRoute = window.location.pathname;
  if (window.location.pathname.includes("/book-now")) {
    activeRoute = "/";
  }
  const { user } = useSelector((state) => state.users);
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line"
    },
    {
      name: "Profile",
      path: "/users",
      icon: "ri-user-line"
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: "ri-file-list-line"
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line"
    }
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line"
    },
    {
      name: "Buses",
      path: "/admin/buses",
      icon: "ri-bus-line"
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line"
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: "ri-file-list-line"
    },
    {
      name: "Logout",
      path: "/admin/logout",
      icon: "ri-logout-box-line"
    }
  ];
  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
  return (
    <>
      <div className="layout-parent">
        <div className="sidebar bg-dark">
          <div className="sidebarHeader">
            <h1 className="logo fw-bolder">HpyTravel</h1>
            <h1 className="role">
              {" "}
              Name : {user?.name} <br />
              Role : {user?.isAdmin ? "Admin" : "User"}
            </h1>
          </div>
          <div className="d-flex flex-column gap-3 menu">
            {menuToBeRendered.map((Item) => {
              return (
                <div
                  className={`${
                    activeRoute === Item.path && "activeMenuItem"
                  }  menuItems`}
                >
                  <i className={Item.icon}></i>
                  <span
                    onClick={() => {
                      if (Item.name === "Logout") {
                        localStorage.removeItem("token");
                        navigate("/login");
                      } else {
                        navigate(Item.path);
                      }
                    }}
                  >
                    {!collapsed ? Item.name : null}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div className="body">
          <div className="header">
            {collapsed ? (
              <i
                class="ri-menu-line"
                onClick={() => setCollapsed(() => !collapsed)}
              ></i>
            ) : (
              <i
                class="ri-close-line"
                onClick={() => setCollapsed(() => !collapsed)}
              ></i>
            )}
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    </>
  );
}

export default DefaultPage;

// This is UserDataAction.js

import * as types from "./UserDataActionType.js";

export const userEmail = (userEmail) => {
  localStorage.setItem("userEmail", JSON.stringify(userEmail));
  return {
    type: types.GETUSEREMAIL,
    payload: userEmail
  };
};

export const LogoutHandleDeclaration = (payload) => {
  localStorage.removeItem("userEmail", JSON.stringify(userEmail));
  return {
    type: types.LOGOUTUSER,
    payload
  };
};


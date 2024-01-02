//  This is UserDataReducer.js

import * as types from "./UserDataActionType.js";
const setUserEmail = localStorage.getItem("userEmail");

const init = {
  userEmail: setUserEmail ? JSON.parse(setUserEmail) : null
};

export const UserDataReducer = (state = init, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GETUSEREMAIL:
      return {
        ...state,
        userEmail: payload
      };
    case types.LOGOUTUSER:
      return {
        ...state,
        userEmail: null
      };

    default:
      return state;
  }
};

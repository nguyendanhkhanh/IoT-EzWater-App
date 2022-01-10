import { AnyAction } from "redux";
import { Auth } from "../action/auth";
import { LOGIN_SUCCESS, LOG_OUT } from "../type";

export const initialToken: Auth = {
  email: null
}

const authReducer = (state = JSON.parse(JSON.stringify(initialToken)), action: AnyAction) => {
  const { type, payload } = action
  switch (type) {
    case LOGIN_SUCCESS: {
      console.log(payload)
      return payload
    }
    case LOG_OUT: {
      return initialToken
    }
    default:
      return state;
  }
}

export default authReducer
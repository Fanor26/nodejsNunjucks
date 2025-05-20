// authReducer.js
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
  CHECK_SESSION,
} from '../store/types/authTypes.js';

const initialState = {
  user: null,
  session: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // Login cases
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        session: action.payload.session,
        isAuthenticated: true,
        loading: false,
        error: null,
      };

    case LOGIN_FAILURE:
    case REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        session: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };

    // Logout case
    case LOGOUT:
      return {
        ...initialState,
      };

    // Check session case
    case CHECK_SESSION:
      return {
        ...state,
        user: action.payload?.user || null,
        session: action.payload?.session || null,
        isAuthenticated: !!action.payload?.user,
      };

    default:
      return state;
  }
};
export default authReducer;

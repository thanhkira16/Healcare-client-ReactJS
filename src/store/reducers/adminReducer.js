import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  isLoadingPosition: false,
  isLoadingRole: false,
  genders: [],
  role: [],
  position: [],
  users: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    //gender
    case actionTypes.FETCH_GENDER_START:
      console.log("Fetch genders starting", action);
      state.isLoadingGender = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      console.log("Fetch genders sucess", action);
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      console.log("Fetch genders failed", action);
      state.genders = [];
      state.isLoadingGender = false;
      return {
        ...state,
      };
    //position
    case actionTypes.FETCH_POSITION_START:
      console.log("Fetch position starting", action);
      state.isLoadingPosition = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_SUCCESS:
      console.log("Fetch position sucess", action);
      state.position = action.data;
      state.isLoadingPosition = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAILED:
      console.log("Fetch position failed", action);
      state.position = [];
      state.isLoadingPosition = false;
      return {
        ...state,
      };
    //role
    case actionTypes.FETCH_ROLE_START:
      console.log("Fetch role starting", action);
      state.isLoadingRole = true;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_SUCCESS:
      console.log("Fetch role sucess", action);
      state.role = action.data;
      state.isLoadingRole = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAILED:
      console.log("Fetch role failed", action);
      state.role = [];
      state.isLoadingRole = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      console.log("Fetch all users", action.users);
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAILED:
      console.log("Fetch role failed", action);
      state.users = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;

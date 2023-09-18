import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  isLoadingPosition: false,
  isLoadingRole: false,
  genders: [],
  role: [],
  position: [],
  users: [],
  topDoctors: [],
  allDoctors: [],
  allScheduleTime: [],
  allRerequiredDoctorInfor: {},
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
    //all users
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
    //top doctors
    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      state.topDoctors = action.doctorsData;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTORS_FAILED:
      state.topDoctors = [];
      return {
        ...state,
      };
    // all doctors
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.allDoctors = action.allDoctorData;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTORS_FAILED:
      state.allDoctors = [];
      return {
        ...state,
      };

    // get time from allcode
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
      state.allScheduleTime = action.dataTime;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
      state.allScheduleTime = [];
      return {
        ...state,
      };
    // get requrired doctor
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
      // console.log("admin reducer", action.data);
      state.allRerequiredDoctorInfor = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
      state.allRerequiredDoctorInfor = {};
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;

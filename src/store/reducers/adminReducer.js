import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  role: [],
  position: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      console.log("Fetch genders starting", action);
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      console.log("Fetch genders sucess", action);
      let copyState = { ...state };
      copyState.genders = action.data;
      console.log("copy state: ", copyState);
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_FAILED:
      console.log("Fetch genders failed", action);
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default adminReducer;

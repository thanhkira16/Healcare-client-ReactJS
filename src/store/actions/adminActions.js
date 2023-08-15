import actionTypes from "./actionTypes";
import { getAllCodeService } from "../../services/userService";
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("gender");
      if (res && res.errCode === 0) {
        console.log(getState);
        dispatch(fetchGenderSucess(res.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (err) {
      dispatch(fetchGenderFailed(err));
      console.log("Failed to fetch", err);
    }
  };
};
export const fetchGenderSucess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

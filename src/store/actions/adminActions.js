import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
} from "../../services/userService";
import { toast } from "react-toastify";
import { FormattedMessage } from "react-intl";
//Gender
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_GENDER_START });
      let res = await getAllCodeService("gender");
      if (res && res.errCode === 0) {
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

//Position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_POSITION_START });
      let res = await getAllCodeService("position");
      if (res && res.errCode === 0) {
        console.log(getState);
        dispatch(fetchPositionSucess(res.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (err) {
      dispatch(fetchPositionFailed(err));
      console.log("Failed to fetch", err);
    }
  };
};
export const fetchPositionSucess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

//Role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_ROLE_START });
      let res = await getAllCodeService("role");
      if (res && res.errCode === 0) {
        console.log(getState);
        dispatch(fetchRoleSucess(res.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (err) {
      dispatch(fetchRoleFailed(err));
      console.log("Failed to fetch", err);
    }
  };
};
export const fetchRoleSucess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

// user
export const craateNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success(<FormattedMessage id="manage-user.userCreatedSuccess" />);
        dispatch(saveUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (err) {
      dispatch(saveUserFailed(err));
      console.log("Failed to fetch", err);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

//get all users
export const fetchAllUserStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      let res2 = await getTopDoctorHomeService("");
      console.log("docter", res2);
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUserFailed());
      }
    } catch (err) {
      dispatch(fetchAllUserFailed());
      console.log("Failed to fetch", err);
    }
  };
};

export const fetchAllUserSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});
export const fetchAllUserFailed = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

//delete user
export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success(<FormattedMessage id="manage-user.userDeletedSuccess" />);
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error(<FormattedMessage id="manage-user.userDeleteFailed" />);
        dispatch(deleteUserFailed());
      }
    } catch (err) {
      dispatch(deleteUserFailed(err));
      console.log("Failed to fetch", err);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFailed = (data) => ({
  type: actionTypes.DELETE_USER_FAILED,
});

//edit user
export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(data);
      if (res && res.errCode === 0) {
        toast.success(<FormattedMessage id="manage-user.updateUserSuccess" />);
        dispatch(editUserSuccess());
        dispatch(fetchAllUserStart());
      } else {
        toast.error(
          <FormattedMessage id="manage-user.updateUserSuccessFailed" />
        );
        dispatch(editUserFailed());
      }
    } catch (err) {
      dispatch(editUserFailed(err));
      console.log("Failed to fetch", err);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = (data) => ({
  type: actionTypes.EDIT_USER_FAILED,
});

//get doctors
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("3");
      if (res && res.errCode === 0) {
        dispatch(fetchTopDoctorSuccess(res));
      } else {
        dispatch(fetchTopDoctorFailed());
      }
    } catch (err) {
      dispatch(fetchTopDoctorFailed(err));
      console.log("Failed to fetch", err);
    }
  };
};

export const fetchTopDoctorSuccess = (res) => ({
  type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
  doctorsData: res.doctors,
});

export const fetchTopDoctorFailed = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTORS_FAILED,
});

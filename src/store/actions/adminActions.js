import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailDoctor,
  getAllSpecialties,
  getAllClinics,
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
export const createNewUser = (data) => {
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
      console.log("Failed to create new user", err);
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
      if (res && res.errCode === 0) {
        dispatch(fetchAllUserSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUserFailed());
      }
    } catch (err) {
      dispatch(fetchAllUserFailed());
      console.log("Failed to get all users", err);
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
      console.log("Failed to delete user", err);
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
      console.log("Failed to edit user", err);
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFailed = (data) => ({
  type: actionTypes.EDIT_USER_FAILED,
});

//get top doctors
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("");
      console.log("action", res);
      if (res && res.errCode === 0) {
        dispatch(fetchTopDoctorSuccess(res));
      } else {
        dispatch(fetchTopDoctorFailed());
      }
    } catch (err) {
      dispatch(fetchTopDoctorFailed(err));
      console.log("Failed to get top doctors", err);
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

//get all doctors
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctorsService();
      if (res && res.errCode === 0) {
        dispatch(fetchAllDoctorsSuccess(res));
      } else {
        dispatch(fetchAllDoctorsFailed());
      }
    } catch (err) {
      dispatch(fetchAllDoctorsFailed(err));
      console.log("Failed to get all doctor", err);
    }
  };
};

export const fetchAllDoctorsSuccess = (res) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
  allDoctorData: res.doctors,
});

export const fetchAllDoctorsFailed = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
});

//save details doctor
export const doSaveDetailDoctor = (data) => {
  console.log("do detail doctor admin actions", data);
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctor(data);
      if (res && res.errCode === 0) {
        toast.success(
          <FormattedMessage id="manage-doctor.saveDetailDoctorSuccess" />
        );
        dispatch(doSaveDetailDoctorSuccess(res));
      } else {
        toast.error(
          <FormattedMessage id="manage-doctor.saveDetailDoctorFailure" />
        );
        dispatch(doSaveDetailDoctorFailed());
      }
    } catch (err) {
      dispatch(doSaveDetailDoctorFailed(err));
      console.log("Failed to save doctor", err);
    }
  };
};

export const doSaveDetailDoctorSuccess = (res) => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
});

export const doSaveDetailDoctorFailed = (data) => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
});

//getch schedule Time for doctor
export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch(fetchAllScheduleTimeSuccess(res));
      } else {
        dispatch(fetchAllScheduleTimeFailed());
      }
    } catch (err) {
      dispatch(fetchAllScheduleTimeFailed(err));
      console.log("Failed to fetch All code time", err);
    }
  };
};

export const fetchAllScheduleTimeSuccess = (res) => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
  dataTime: res.data,
});

export const fetchAllScheduleTimeFailed = (data) => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
});

//fetch required doctor information
export const getRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START });
      let resPrice = await getAllCodeService("PRICE");
      let resPayment = await getAllCodeService("PAYMENT");
      let resProvince = await getAllCodeService("PROVINCE");
      let resSpecialty = await getAllSpecialties();
      let resClinic = await getAllClinics();
      if (
        resPrice &&
        resPrice.errCode === 0 &&
        resPayment &&
        resPayment.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0 &&
        resSpecialty &&
        resSpecialty.errCode === 0 &&
        resClinic &&
        resClinic.errCode === 0
      ) {
        let data = {
          resPrice: resPrice.data,
          resPayment: resPayment.data,
          resProvince: resProvince.data,
          resSpecialty: resSpecialty.data,
          resClinic: resClinic.data,
        };
        console.log("action data", data);
        dispatch(fetchRequiredDoctorInforSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInforFailed());
      }
    } catch (err) {
      dispatch(fetchRequiredDoctorInforFailed(err));
      console.log("Failed to fetch required doctor infor", err);
    }
  };
};

export const fetchRequiredDoctorInforSuccess = (allRerequiredDoctorInfor) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  data: allRerequiredDoctorInfor,
});

export const fetchRequiredDoctorInforFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});

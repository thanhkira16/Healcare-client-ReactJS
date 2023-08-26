import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("/api/login", { email, password });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
  console.log("check data from service", data);

  return axios.post("/api/create-new-user", data);
};

const deleteUserService = (userId) => {
  return axios.delete("/api/delete-user", {
    params: {
      id: userId,
    },
  });
};
const editUserService = (data) => {
  console.log("check data from service", data);
  return axios.put("/api/edit-user", data);
};

const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};
const getTopDoctorHomeService = (numOfDoctors) => {
  return axios.get(`/api/top-doctor-home?numOfDoctors=${numOfDoctors}`);
};
const getAllDoctorsService = () => {
  return axios.get("/api/get-all-doctors");
};
const saveDetailDoctor = (data) => {
  return axios.post("/api/save-info-doctor", data);
};
const getDetailInfoDoctor = (id) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctorsService,
  saveDetailDoctor,
  getDetailInfoDoctor,
};

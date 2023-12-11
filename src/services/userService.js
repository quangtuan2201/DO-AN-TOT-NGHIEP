import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3333/api",
});
//Handle login
const handleLogin = async (email, password) => {
  try {
    return await instance.post("/login", {
      email,
      password,
    });
  } catch (error) {
    throw error;
  }
};
// Get User
const getAllUsers = async (userId) => {
  try {
    const response = await instance.get(`/users`); //${userId}
    return response;
  } catch (error) {
    throw `Không lấy được danh sách user ${error}`;
  }
};
//Update User
const updateUser = async (formData) => {
  try {
    const response = await instance.patch("/users", formData); //JSON.stringify(formData)
    return response;
  } catch (error) {
    throw `Khong call duoc api:  ${error}`;
  }
};
//Create User
const createUser = async (formData) => {
  try {
    // console.log("FORM DATA in userService: ", formData);
    const response = await instance.post("/users", formData);
    // console.log("RESPOMSE in userService:  ", response);
    // console.log("RESPOMSE :image in userService:  ", response.user?.image);
    return response;
  } catch (error) {
    throw ` ${error}`;
  }
};
//Delete User
const deleteUser = async (userId) => {
  try {
    const response = await instance.delete(`/users?id=${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
//get AllCode
const getAllCode = async (form) => {
  try {
    if (form) {
      const response = await instance.get(`/allcode?type=${form}`);
      return response;
    }
  } catch (error) {
    throw error;
  }
};
//[GET] Doctor
//actionRecord : lấy ALL doctor(key:allDoctor) or top doctor(key : topDoctor)
const fetchGetDoctor = async (limit, roleId) => {
  try {
    console.log("limit userService: ", limit);
    const response = await instance.get("/top-doctor-home", {
      params: {
        limit,
        roleId,
      },
    });

    // Kiểm tra xem response có tồn tại không
    if (response && response.data) {
      return response.data;
    } else {
      return {
        error: "Invalid response format",
      };
    }
  } catch (error) {
    return {
      error: error.message || "Request failed",
    };
  }
};
export default {
  handleLogin,
  getAllUsers,
  updateUser,
  createUser,
  deleteUser,
  getAllCode,
  fetchGetDoctor,
};

import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3333/api",
});
//Handle login
const handleLogin = async (user) => {
  try {
    const response = await instance.post("/login", {
      email: user.email,
      password: user.password,
    });
    if (response && response.data) {
      return response.data;
    } else {
      return null;
    }
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
      if (response.data.data && response.data.errCode === 0) {
        return response;
      }
    }
  } catch (error) {
    throw error;
  }
};
//[GET] Doctor
//actionRecord : lấy ALL doctor(key:allDoctor) or top doctor(key : topDoctor)
const fetchGetTopDoctor = async (limit, roleId) => {
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
//Lấy kết quả người dùng tìm kiếm
const fetchGetResultSearch = async (keyword) => {
  try {
    if (!keyword) {
      return null;
    }
    const results = await instance.get("/search", {
      params: { keyword },
    });
    console.log("Result search: ", results);
    const { data, errCode } = results.data;
    if (data && errCode === 0) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
//
const fetchGetStatisticalByDate = async (formData) => {
  try {
    console.log("Form data: ", formData);
    const response = await instance.get("/get-statistics-by-date", {
      params: formData,
    });
    console.log("response: ", response);
    const { data, errCode } = response.data;
    if (data && errCode === 0) {
      return data;
    } else {
      return;
    }
  } catch (error) {
    throw error;
  }
};
export default {
  handleLogin,
  getAllUsers,
  updateUser,
  createUser,
  deleteUser,
  getAllCode,
  fetchGetTopDoctor,
  fetchGetResultSearch,
  fetchGetStatisticalByDate,
};

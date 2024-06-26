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
    console.log("response: ", response);
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
//Lấy dữ liệu thống kế bằng date
const fetchGetStatisticalByDate = async (formData) => {
  try {
    const response = await instance.get("/get-statistics-by-date", {
      params: formData,
    });
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
//Lấy dữ liệu lịch sử đặt lịch
const fetchGetHistorysBookingByDate = async (formData) => {
  try {
    const response = await instance.get("/get-historys-booking-by-date", {
      params: formData,
    });
    const { data, errCode } = response.data;
    if ((data, errCode === 0)) {
      return data;
    } else {
      return;
    }
  } catch (error) {
    throw error;
  }
};
// cập nhật mật khẩu
const fetchForgotPassword = async (email, language) => {
  try {
    if (!email) {
      return;
    }
    const response = await instance.post("forgot-password", {
      email,
      language,
    });
    const { errCode } = response.data;
    if (errCode === 0) {
      return response.data;
    } else {
      return;
    }
  } catch (error) {
    throw error;
  }
};
//xác thực mã code
const fetchVerifyCode = async (data) => {
  try {
    const response = await instance.post("/verify-code", data);
    const { errCode } = response.data;
    if (errCode === 0) {
      return response.data;
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
  fetchGetHistorysBookingByDate,
  fetchForgotPassword,
  fetchVerifyCode,
};

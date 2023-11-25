import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3333/api",
});

//xu ly login
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
// Lay user nguoi dung
const getAllUsers = async (userId) => {
  try {
    const response = await instance.get(`/get-all-users`); //${userId}
    return response;
  } catch (error) {
    throw `Không lấy được danh sách user ${error}`;
  }
};
const updateUser = async (formData) => {
  try {
    console.log("form Datta:", formData.id);
    const response = await instance.put("/users", formData); //JSON.stringify(formData)
    console.log("response:", response);
    return response;
  } catch (error) {
    throw `Khong call duoc api:  ${error}`;
  }
};
const createUser = async (formData) => {
  try {
    const response = await instance.post("/users", formData);
    return response;
  } catch (error) {
    throw ` ${error}`;
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await instance.delete(`/delete-user?id=${userId}`);
    return response;
  } catch (error) {
    throw error;
  }
};
export default { handleLogin, getAllUsers, updateUser, createUser, deleteUser };

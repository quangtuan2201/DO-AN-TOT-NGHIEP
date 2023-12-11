import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3333/api",
});
//[GET] /api/get-all-doctors
const handleGetAllDoctors = async () => {
  try {
    const response = await instance.get(`/get-all-doctors`);
    if (response && response.data) {
      return response.data;
    } else {
      return {
        error: "Invalid response format",
      };
    }
  } catch (error) {
    throw error;
  }
};
const handleSaveInfoDoctor = async (InfoDoctor) => {
  try {
    const response = await instance.post("/save-info-doctor", InfoDoctor);
    console.log("Call API save info doctor in doctorService:", response);
    if (response && response.data) {
      return response;
    } else {
      return {
        error: "Invalid response format",
      };
    }
  } catch (error) {
    return {
      message: `Fail call API save info doctor in doctorService: ${error.message}`,
    };
  }
};

export default {
  handleGetAllDoctors,
  handleSaveInfoDoctor,
};

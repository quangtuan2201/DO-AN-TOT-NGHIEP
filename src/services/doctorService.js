import axios from "axios";
import { dateFilter } from "react-bootstrap-table2-filter";
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
//[CREATE] || [UPDATE] /api/save-info-doctor
const handleSaveInfoDoctor = async (InfoDoctor) => {
  try {
    const response = await instance.post("/save-info-doctor", InfoDoctor);
    console.log("Call API save info doctor in doctorService:", response);
    if (response && response.data) {
      return response.data;
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
const handleGetDetailDoctor = async (id) => {
  try {
    const response = await instance.get(`/detail-doctor-by-id?id=${id}`);
    // console.log("response handleGetDetailDoctor: ", response);
    if (response.data.data && response.data.errCode === 0) {
      return response.data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(
      "Fail call API get detail info doctor in doctorService: ",
      error.message
    );
  }
};
//[GET] /api/get-schedule-hours
const handleAllCodeScheduleHours = async () => {
  try {
    const response = await instance.get("/allcode-schedule-hours");
    if (response.data && response.data.errCode === 0) {
      return response.data.data;
    }
  } catch (error) {
    console.error("Fetch api get allcode schedule fail!");
    return null;
  }
};
//[POST] /api//api/bulk-create-schedule
const handlBulkCreateSchedule = async (data) => {
  try {
    const response = await instance.post("/bulk-create-schedule", data);
    if (response.errCode === 0 && response.data) {
      return response.data;
    } else {
      console.log("response fetch Fail: ", response);
      return null;
    }
  } catch (error) {
    console.error("Fetch call api bulk create schedule Fail: ", error.message);
    return null;
  }
};

export default {
  handleGetAllDoctors,
  handleSaveInfoDoctor,
  handleGetDetailDoctor,
  handleAllCodeScheduleHours,
  handlBulkCreateSchedule,
};

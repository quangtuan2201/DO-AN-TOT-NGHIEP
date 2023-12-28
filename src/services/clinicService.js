import axios from "axios";
import { dateFilter } from "react-bootstrap-table2-filter";
import thunk from "redux-thunk";
const instance = axios.create({
  baseURL: "http://localhost:3333/api",
});
const handleSaveInfoClinic = async (formData) => {
  try {
    const response = await instance.post("/save-info-clinic", formData);
    if (response) {
      return response;
    }
  } catch (error) {
    throw error;
  }
};
//[GET]: /api//get-all-clinic
const handlGetAllClinic = async () => {
  try {
    const response = await instance.get("/get-all-clinic");
    console.log("Get all info clinic", response);
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
//[GET] /api/get-info-clinic-by-id
const handlGetInfoDetailClinic = async (clinicId) => {
  try {
    if (!clinicId) {
      return null;
    }
    const response = await instance.get("/get-info-clinic-by-id", {
      params: { id: clinicId },
    });
    console.log("Get info detail clinic : ", response);
    const { data, errCode } = response.data;
    if (data && errCode === 0) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
export default {
  handleSaveInfoClinic,
  handlGetAllClinic,
  handlGetInfoDetailClinic,
};

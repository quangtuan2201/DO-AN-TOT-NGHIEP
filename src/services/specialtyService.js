import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3333/api",
});

//[POST] /api/create-new-specialty
const handlCreateNewSpecialty = async (formData) => {
  try {
    const response = await instance.post("/create-new-specialty", formData);
    const { data, errCode } = response.data;
    if (data && errCode === 0) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Fetch api create specialty fail...");
  }
};
//[GET] /api/get-all-specialty
const handlGetAllSpecialty = async () => {
  try {
    const response = await instance.get("/get-all-specialty");
    const { data, errCode } = response.data;
    if (data && errCode === 0) {
      return response.data.data;
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};
//[GET] /api/get-specialty-by-id
const handlGetSpecialtyById = async (specialtyId, location) => {
  try {
    if (!specialtyId || !location) {
      return;
    }
    const response = await instance.get("/get-specialty-by-id", {
      params: { id: specialtyId, location },
    });
    const { data, errCode } = response.data;
    if (data && errCode === 0) {
      return data;
    }
  } catch (error) {
    throw error;
  }
};

export default {
  handlCreateNewSpecialty,
  handlGetAllSpecialty,
  handlGetSpecialtyById,
};

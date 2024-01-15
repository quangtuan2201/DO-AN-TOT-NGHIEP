import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3333/api",
});
export const handlCreateNewSpecialty = async (formData) => {
  try {
    const response = await instance.post("/create-new-handbook", formData);
    const { data, errCode } = response.data;
    if (data && errCode === 0) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Fetch api create hanbook fail...");
  }
};
export const handlGetAllHanbook = async () => {
  try {
    const response = await instance.get("/get-all-handbooks");
    const { data, errCode } = response.data;
    if (data && errCode === 0) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Fetch api get all hanbook fail...");
  }
};
export const handlGetDetailHanbook = async (hanbookId) => {
  try {
    const response = await instance.get("/get-detail-hanbook", {
      params: { id: hanbookId },
    });
    const { data, errCode } = response.data;
    if (data && errCode === 0) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Fetch api get all hanbook fail...");
  }
};

export default {};

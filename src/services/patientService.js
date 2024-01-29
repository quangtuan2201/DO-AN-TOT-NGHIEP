import axios from "axios";
const instance = axios.create({
  baseURL: "http://localhost:3333/api",
});
//Lưu thông tin đătj lịch khám bệnh
const handlSavePatientBookAppointment = async (patientInfo) => {
  try {
    if (
      !patientInfo.email ||
      !patientInfo.doctorId ||
      !patientInfo.timeType ||
      !patientInfo.date
    ) {
      // alert("Mising param");
      console.error("Missing param");
      return null;
    }
    const response = await instance.post(
      "/patient-book-appointment",
      patientInfo
    );
    const { data, errCode } = response.data;
    if (data && errCode === 0) {
      return data;
    } else {
      console.error("data response: ", response);
      return null;
    }
  } catch (error) {
    console.error("Xay ra loi khi call api ....");
  }
};
//handl get token and doctorId
const handlSaveVerifyAppointment = async (token, doctorId) => {
  try {
    const response = await instance.post("/verify-book-appointment", {
      token,
      doctorId,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetch confirm appotient !");
  }
};
//[GET]:/api/get-list-patient-for-doctor
const handlGetListPatientDoctor = async (doctorId, date) => {
  try {
    const response = await instance.get("/get-list-patient-for-doctor", {
      params: { doctorId, date },
    });
    const { data, errCode } = response.data;
    if (data && errCode === 0) {
      return data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Fetch get list patient doctor fail" + error.message);
    throw error;
  }
};
//
const handlSendRemedy = async (formData) => {
  try {
    const response = await instance.post("/send-remeder", formData);
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
//
const handlAppointmentSchedule = async ({ email, date }) => {
  try {
    if (!email || !date) {
      console.log("Missing parameter !");
      return;
    }
    const response = await instance.post("/get-appointment-schedule", {
      email,
      date,
    });
    // {
    //   params: { email, date },
    // });
    console.log("fetch data get lịch hẹn : ", response);
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
  handlSavePatientBookAppointment,
  handlSaveVerifyAppointment,
  handlGetListPatientDoctor,
  handlSendRemedy,
  handlAppointmentSchedule,
};

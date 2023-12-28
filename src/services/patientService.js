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
    console.log("Thông tin đặt lịch của bệnh nhân : ", patientInfo);
    const response = await instance.post(
      "/patient-book-appointment",
      patientInfo
    );
    console.log("response: ", response);
    const { data, errCode } = response.data;
    if (response && errCode === 0) {
      return data[0];
    } else {
      console.log("data response: ", response);
      return null;
    }
  } catch (error) {
    console.error("Xay ra loi khi call api ....");
  }
};
//handl get token and doctorId
const handlSaveVerifyAppointment = async (token, doctorId) => {
  try {
    console.log("token: ", token);
    console.log("doctorId: ", doctorId);
    const response = await instance.post("/verify-book-appointment", {
      token,
      doctorId,
    });
    // console.log("response: ", response);
    // const { errCode, messenge } = response.data;
    // if (+errCode === 0) {
    //   return { statusVerify: true, messenge };
    // }
    // {
    //   return { statusVerify: false, messenge };
    // }
    return response.data;
  } catch (error) {
    console.error("Error fetch confirm appotient !");
  }
};
//[GET]:/api/get-list-patient-for-doctor
const handlGetListPatientDoctor = async (doctorId, date) => {
  try {
    // if (!doctorId || date) {
    //   return null;
    // }
    console.log(`Patient service , doctorId:${doctorId} và date: ${date}`);
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
    console.log("response : ", response);
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
export default {
  handlSavePatientBookAppointment,
  handlSaveVerifyAppointment,
  handlGetListPatientDoctor,
  handlSendRemedy,
};

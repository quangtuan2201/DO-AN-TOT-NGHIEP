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
      alert("Mising param");
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

export default {
  handlSavePatientBookAppointment,
};

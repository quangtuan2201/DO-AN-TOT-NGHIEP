import { useParams } from "react-router-dom";
import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import patientService from "../../services/patientService";
import HomeHeader from "../HomePage/HomeHeader";

import React, {
  useState,
  useEffect,
  memo,
  useCallback,
  createContext,
} from "react";
function VerifyEmail(prop) {
  const [statusVerify, setStatusVerify] = useState("");
  // const { search } = useLocation(); saveVerifiyBookAppointment
  // const params = new URLSearchParams(search);
  // const token = params.get("token");
  // const doctorId = params.get("doctorId");
  // console.log("token: ", token);
  const state = useSelector((state) => {
    console.log("State : ", state);
    return state;
  });
  useEffect(() => {
    (async () => {
      if (prop.history && prop.location.search) {
        const urlParams = new URLSearchParams(prop.location.search);
        let token = urlParams.get("token");
        let doctorId = urlParams.get("doctorId");
        console.log("token: ", token);
        console.log("doctorId: ", doctorId);
        const response = await patientService.handlSaveVerifyAppointment(
          token,
          doctorId
        );
        console.log("response: ", response);
        if (response && +response.errCode === 0) {
          setStatusVerify("Lịch đặt của bạn kích hoạt thành công");
        } else if (+response.errCode === 2) {
          setStatusVerify("Lịch hẹn đã được kích hoạt hoặc không tồn tại");
        } else {
          setStatusVerify("Lịch đặt khám của bạn đã không được kích hoạt");
        }
      }
    })();
  }, [prop.history, prop.location.search]);
  console.log("Prop chidl: ", prop);
  return (
    <>
      <HomeHeader />
      <div className="text-center mt-5">
        <h1 className="text-danger">{statusVerify}</h1>
      </div>
    </>
  );
}

export default VerifyEmail;

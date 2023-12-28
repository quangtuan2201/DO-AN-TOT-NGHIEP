import { useState, useEffect, useMemo, memo, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import "./ProfileDoctor.scss";
import doctorService from "../../../services/doctorService";
import { LANGUAGES } from "../../../utils/constant";
import { ThemeContextDoctorSchedule } from ".././Clinic/DoctorSchedule";

function ProfileDoctor({ isShowDescription, id, selectedTimeSlot }) {
  // const { id } = useParams();
  const isMounted = useRef(true);
  const [profileDoctor, setProfileDoctor] = useState({});
  console.log("-----re-render---------ProfileDoctor");
  // console.log("user click booking: ", selectedTimeSlot);
  // const { selectedTimeSlot } = useContext(ThemeContextDoctorSchedule);
  const language = useSelector((state) => {
    return state.app.language;
  });
  const checkLang = language === LANGUAGES.VI;
  console.log(" Giá trị doctor được truyền id: : ", id);
  const renderTimeBooking = () => {
    if (!selectedTimeSlot) {
      console.error("SelectedTimeSlot underfined or null");
      return null;
    }
    const bookFrameHours = checkLang
      ? selectedTimeSlot?.timeTypeData?.valueVn
      : selectedTimeSlot?.timeTypeData?.valueEn;
    const timestamp = +selectedTimeSlot?.date;
    const date = moment(timestamp).toDate();
    const dateVn = moment(date).format("dddd - DD/MM");
    const dateEn = moment(date).locale("en").format("ddd - DD/MM");
    //     console.log("Ngày chọn lịch khám : ", date);
    //     console.log("moment vi: ", moment(new Date()).format("dddd - DD/MM"));
    //     console.log(
    //       "moment en: ",
    //       moment(new Date()).locale("en").format("ddd - DD/MM")
    //     );
    return (
      <>
        {`${bookFrameHours}, ${checkLang ? dateVn : dateEn}`}
        <br />
        <i className="fas fa-map-marker-alt mr-2 "></i>
        <p className="d-inline-block font-italic">
          {profileDoctor?.Doctor_Info?.nameClinic}
        </p>
      </>
    );
  };

  const formatter = new Intl.NumberFormat(checkLang ? "vi-VN" : "en-US", {
    style: "currency",
    currency: checkLang ? "VND" : "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    // Khai báo biến để lưu trữ dữ liệu

    (async () => {
      try {
        // Gán giá trị từ phản hồi vào biến đã khai báo
        const result = await doctorService.handlGetProfileDoctorById(
          id,
          signal
        );
        if (result) {
          // console.log("isMounted: ", isMounted.current);
          // Gọi hàm setProfileDoctor bên trong hàm fetchData
          setProfileDoctor(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [id]);

  // console.log("profileDoctor", profileDoctor);
  //   const
  return (
    <>
      <div className="profile-doctor-container ">
        <div className="content-left">
          <div
            className="profile-doctor-avatar "
            style={{ backgroundImage: `url("${profileDoctor?.image}")` }}
          ></div>
        </div>
        <div className="content-right">
          <div className="font-weight-bold  doctor-position ">
            {checkLang
              ? profileDoctor?.positionData?.valueVn
              : profileDoctor?.positionData?.valueEn}
            ,{`${profileDoctor.lastName} ${profileDoctor.firstName}`}
          </div>
          <div className="doctor-description-content">
            {isShowDescription ? (
              <>
                {profileDoctor?.Markdown?.description}
                <br />
                <i className="fas fa-map-marker-alt mr-2 mt-2"></i>
                <p className="d-inline-block font-italic">
                  {profileDoctor?.Doctor_Info?.nameClinic}
                </p>
              </>
            ) : (
              <>{renderTimeBooking()}</>
            )}
          </div>
        </div>
      </div>
      <div className="font-weight-bold price">
        Giá khám:
        {profileDoctor &&
          formatter.format(
            checkLang
              ? profileDoctor?.Doctor_Info?.priceData?.valueVn
              : profileDoctor?.Doctor_Info?.priceData?.valueEn
          )}
      </div>
    </>
  );
}
export default memo(ProfileDoctor);

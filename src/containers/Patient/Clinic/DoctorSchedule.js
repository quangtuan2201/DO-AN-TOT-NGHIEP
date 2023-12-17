import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../../store/actions";
import moment, { lang, months } from "moment";
import localization from "moment/locale/vi";
/* import để thư viện moment 
biết dự án có sử dụng tiếng việt */
import doctorService from "../../../services/doctorService";
import { LANGUAGES, dateFormat } from "../../../utils/constant";
import { FormattedMessage, useIntl } from "react-intl";
import "./DoctorSchedule.scss";

function DoctorSchedule() {
  const dispatch = useDispatch();
  const [allDays, setAllDays] = useState([]);
  const [chosenDate, setChosenDate] = useState(0);
  const [allAvalableTime, setAllAvalableTime] = useState([]);
  const { language, doctor } = useSelector((state) => {
    console.log("State redux: ", state);
    console.log("Doctor: ", state.admin.detailDoctor);
    return {
      language: state.app.language,
      doctor: state.admin.detailDoctor,
    };
  });
  console.log("++--------------------------------------------------");
  console.log("Re render");
  console.log("++--------------------------------------------------");
  console.log("moment vi: ", moment(new Date()).format("dddd - DD/MM"));
  console.log(
    "moment en: ",
    moment(new Date()).locale("en").format("ddd - DD/MM")
  );

  // Hàm chuyển đổi ngôn ngữ ,chatGPT
  const getDayLabel = (language, date, format) => {
    const dayLabel = moment(date).locale(language).format(format);
    if (moment(date).isSame(moment(), "day")) {
      return language === LANGUAGES.VI ? "Hôm nay" : "Today";
    }
    return dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1);
  };
  useEffect(() => {
    //Hàm l ấy danh sách 7 ngày từ hôm nay đển hiện tại
    const getAllDays = () => {
      let arrDate = [];
      for (let i = 0; i < 7; i++) {
        let object = {};
        object.label = getDayLabel(
          language,
          moment(new Date()).add(i, "days"),
          language === LANGUAGES.VI ? "dddd - DD/MM" : "ddd - DD/MM"
        );
        console.log("lable EN: ", object.label);
        object.value = moment(new Date())
          .add(i, "days")
          .startOf("day")
          .valueOf();
        arrDate.push(object);
      }
      setAllDays(arrDate);
      return arrDate;
    };

    const getCurrentDay = async () => {
      const timestamp = moment().startOf("day").valueOf();
      const { data, errCode } = await doctorService.handlefindScheduleByDate(
        doctor?.id,
        timestamp
      );
      if (data && data?.length > 0 && errCode === 0) {
        setAllAvalableTime(data);
      } else {
        setAllAvalableTime(
          <FormattedMessage id="manage-schedule.no-appointment-scheduled" />
        );
      }
    };

    const day = getAllDays();
    getCurrentDay();
  }, [language, doctor]);

  const handleBookingDateSelect = async (e) => {
    let selectDate = e?.target?.value;
    if (!selectDate) {
      return;
    }
    setChosenDate(selectDate);
    const { data, errCode } = await doctorService.handlefindScheduleByDate(
      doctor.id,
      e.target.value
    );
    console.log("reponse: ", data);
    if (data?.length > 0 && errCode === 0) {
      setAllAvalableTime(data);
    } else {
      setAllAvalableTime(
        <FormattedMessage id="manage-schedule.no-appointment-scheduled" />
      );
    }
  };

  return (
    <>
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select className="list-schedule" onChange={handleBookingDateSelect}>
            {/* <option value="">Chose schedule</option> */}
            {allDays &&
              allDays.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
          </select>
        </div>
        <div className="all-available-time">
          <div className="text-celendar">
            <i className="far fa-calendar-alt">
              <span>
                <FormattedMessage id="manage-schedule.appointment" />
              </span>
            </i>
          </div>
          <div className="time-content">
            {Array.isArray(allAvalableTime) ? (
              allAvalableTime.map((item, index) => (
                <button className="checked-btn-hours" key={index}>
                  {language === LANGUAGES.VI
                    ? item?.timeTypeData?.valueVn
                    : item?.timeTypeData?.valueEn}
                </button>
              ))
            ) : (
              <span>{allAvalableTime}</span>
            )}
          </div>
        </div>
        <div className="warning-schedule-hours">
          <p className="param-warning">
            <FormattedMessage id="manage-schedule.chosse" />
            <i class="fas fa-hand-point-up"></i>
            <FormattedMessage id="manage-schedule.and-book" />
          </p>
        </div>
      </div>
    </>
  );
}
export default memo(DoctorSchedule);

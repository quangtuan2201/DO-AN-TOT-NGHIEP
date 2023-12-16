import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../../store/actions";
import moment, { lang, months } from "moment";
import localization from "moment/locale/vi";
/* import để thư viện moment 
biết dự án có sử dụng tiếng việt */
import doctorService from "../../../services/doctorService";
import { LANGUAGES, dateFormat } from "../../../utils/constant";
import "./DoctorSchedule.scss";

function DoctorSchedule() {
  const dispatch = useDispatch();
  const [allDays, setAllDays] = useState([]);
  const [chosenDate, setChosenDate] = useState(0);
  const [scheduLeableDates, setScheduleLabelDates] = useState([]);
  const [allAvalableTime, setAllAvalableTime] = useState([]);
  console.log("List chedule hours : ", allAvalableTime);
  const { language, doctor } = useSelector((state) => {
    console.log("State redux: ", state);
    console.log("Doctor: ", state.admin.detailDoctor);
    return {
      language: state.app.language,
      doctor: state.admin.detailDoctor,
    };
  });
  //   console.log("moment vi: ", moment(new Date()).format("dddd - DD/MM"));
  //   console.log(
  //     "moment en: ",
  //     moment(new Date()).locale("en").format("ddd - DD/MM")
  //   );

  useEffect(() => {
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        let dayLabel = moment(new Date()).add(i, "days").format("dddd - DD/MM");
        // Chuyển đổi chữ cái đầu thành chữ hoa
        dayLabel = dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1);
        object.label = dayLabel;
      } else {
        let dayLabel = moment(new Date())
          .add(i, "days")
          .locale("en")
          .format("ddd - DD/MM");
        // Chuyển đổi chữ cái đầu thành chữ hoa
        dayLabel = dayLabel.charAt(0).toUpperCase() + dayLabel.slice(1);
        object.label = dayLabel;
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(object);
    }
    setAllDays(arrDate);
  }, [language]);
  console.log("LỊCH KHÁM: ", allDays);

  const handleBookingDateSelect = async (e) => {
    console.log("---User select:", e?.target?.value);
    let selectDate = e?.target?.value;
    if (!selectDate) {
      return;
    }
    setChosenDate(selectDate);
    const response = await doctorService.handlefindScheduleByDate(
      doctor.id,
      e.target.value
    );
    console.log("seponse: ", response);
    if (response.data.length > 0 && response.errCode === 0) {
      setAllAvalableTime(response.data);
    } else {
      setAllAvalableTime([]);
    }
  };
  //------------------------------------------
  useEffect(() => {
    // Tạo đối tượng Date hiện tại
    const currentDate = new Date();
    const timestamp = moment(currentDate).valueOf();
    console.log("***********doctorId", doctor?.id, timestamp);
    console.log("\\\\\\\\conver day :", allDays.value);

    const getCurrentDay = async () => {
      const response = await doctorService.handlefindScheduleByDate(
        doctor?.id,
        timestamp
      );
      console.log("%%%%%%%%%Curent day : ", response.data);

      if (response.data && response.data.length > 0 && response.errCode === 0) {
        console.log("%%%%%%%%%Curent day : ", response.data);
        setAllAvalableTime(response.data);
      } else {
        setAllAvalableTime([]);
      }
    };
    getCurrentDay();
  }, [doctor, allDays]);

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
            <i class="far fa-calendar-alt">
              <span>lịch khám</span>
            </i>
          </div>
          <div className="time-content">
            {allAvalableTime &&
              allAvalableTime.map((item, index) => (
                <button className="checked-btn-hours" key={index}>
                  {language === LANGUAGES.VI
                    ? item.timeTypeData.valueVn
                    : item.timeTypeData.valueEn}
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default DoctorSchedule;

import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import moment from "moment";
import "./ManageSchedule.scss";
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
import { LANGUAGES, dateFormat } from "../../../utils/constant";
import { toast } from "react-toastify";
import doctorService from "../../../services/doctorService";
function DoctorSelect({ options, onChange, value }) {
  return <Select options={options} onChange={onChange} value={value} />;
}
// Hàm để lấy ngày hiện tại dưới dạng yyyy-mm-dd
function Doctor() {
  const dispatch = useDispatch();
  const [selectDoctor, setSelectOption] = useState({});
  const [selectedAppointment, setSelectedAppointment] = useState([]);
  const [options, setOptions] = useState([]);
  const [infoSchedule, setInfoSchedule] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    loggedIn,
    language,
    systemMenuPath,
    allDoctors,
    appointmentSchedule,
  } = useSelector((state) => {
    // console.log("State Redux: ", state);
    return {
      loggedIn: state.user.isLoggedIn,
      language: state.app.language,
      systemMenuPath: state.app.systemMenuPath,
      allDoctors: state.admin.allDoctors,
      appointmentSchedule: state.doctor.allCodescheduleHours,
    };
  });
  useEffect(() => {
    setSelectedDate(new Date());
    if (!Object.keys(allDoctors).length) {
      dispatch(actions.fetchGetAllDoctors());
    } else {
      setOptions(() => {
        return allDoctors.map((doctor) => {
          return {
            value: doctor.id,
            label: `${doctor.lastName} ${doctor.firstName} `,
          };
        });
      });
    }
  }, [allDoctors]);
  useEffect(() => {
    dispatch(actions.fetchAllCodeScheduleHours());
  }, []);
  const handlSelectDoctor = (selectDoctor) => {
    console.log("Select: ", selectDoctor);
    setSelectOption(selectDoctor);
    setInfoSchedule((pres) => {
      return {
        ...pres,
        chosenDoctor: {
          id: selectDoctor.value,
          fullName: selectDoctor.label,
        },
      };
    });
  };
  const handleDateChange = (date) => {
    // Chuyển đổi thành đối tượng Moment
    const momentObject = moment(date[0]);
    console.log("date: ", date[0]);
    if (!momentObject.isValid()) {
      // console.error("Invalid moment object: ", momentObject);
      return;
    } else {
      // const formattedDate = momentObject.format(dateFormat.SEND_TO_SERVER);
      // console.log("Fomat Date: ", formattedDate);
      let formattedDate = new Date(momentObject).getTime();
      setSelectedDate(date[0]);
      setInfoSchedule((pres) => {
        return {
          ...pres,
          selectedDate: formattedDate,
        };
      });
    }
  };
  const handleAppointmentSelect = (scheduleHours) => {
    console.log("scheduleHours: ", scheduleHours);
    setSelectedAppointment((present) => {
      let isCheckked = present.includes(scheduleHours);
      let appointmentSelect = [];
      if (isCheckked) {
        appointmentSelect = present.filter((item) => item !== scheduleHours);
      } else {
        appointmentSelect = [...present, scheduleHours];
      }
      setInfoSchedule((pres) => {
        return {
          ...pres,
          scheduleHoursList: appointmentSelect,
        };
      });
      return appointmentSelect;
    });
    console.log("Schedule hours; ", selectedAppointment);
  };
  const handleInfoSchedule = async () => {
    let result = [];
    if (!infoSchedule?.chosenDoctor?.hasOwnProperty("id")) {
      toast.warn(
        <FormattedMessage id="manage-schedule.warring-select-doctor" />
      );
      return;
    }
    if (!infoSchedule?.hasOwnProperty("selectedDate")) {
      toast.warn(<FormattedMessage id="manage-schedule.warring-select-date" />);
      return;
    }
    if (!infoSchedule?.hasOwnProperty("scheduleHoursList")) {
      toast.warn(
        <FormattedMessage id="manage-schedule.warring-select-schedule-hours" />
      );
    }
    console.log("DATA INFO SCHEDULE: ", infoSchedule);
    // const dataArray = Object.values(infoSchedule);
    if (infoSchedule?.hasOwnProperty("scheduleHoursList")) {
      infoSchedule.scheduleHoursList.map((element) => {
        const obj = {};
        obj.doctorId = infoSchedule.chosenDoctor.id;
        obj.date = infoSchedule.selectedDate;
        obj.timeType = element;
        result.push(obj);
      });
      console.log("Result: ", result);
    }
    const response = await doctorService.handlBulkCreateSchedule(result);
    if (response) {
      console.log("Quang tuan dev: ", response);
    } else {
      console.log("quang tuan dev");
    }
  };

  return (
    <React.Fragment>
      <div className="manage-schedule-container">
        <div className="m-s-title">
          <FormattedMessage id="manage-schedule.title" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label className="font-weight-bold text-large form-label">
                <FormattedMessage id="manage-schedule.select-doctor" />
              </label>
              <DoctorSelect
                options={options}
                onChange={handlSelectDoctor}
                value={selectDoctor}
              />
            </div>
            <div className="col-6 form-group">
              <label className="font-weight-bold form-label">
                <FormattedMessage id="manage-schedule.select-date" />
              </label>

              <DatePicker
                className="form-control"
                minDate={new Date()}
                onChange={handleDateChange}
                value={selectedDate}
              />
            </div>
            <div className="col-12 pick-hour-container">
              <div className="col-6 content-left">
                <div className="schedule-alert">
                  <i class="far fa-calendar-alt"></i>
                  <span>
                    <FormattedMessage id="manage-schedule.appointment-schedule" />
                  </span>
                </div>
                <div className="schedule-content ">
                  {appointmentSchedule &&
                    appointmentSchedule.map((schedule) => (
                      <label
                        className={`clinic-hours ${
                          selectedAppointment.includes(schedule.keyMap)
                            ? "active"
                            : ""
                        } `}
                      >
                        {language === LANGUAGES.EN
                          ? schedule.valueEn
                          : schedule.valueVn}
                        <input
                          className="clinic-hours-click"
                          type="checkbox"
                          checked={selectedAppointment.includes(
                            schedule.keyMap
                          )}
                          onChange={() =>
                            handleAppointmentSelect(schedule.keyMap)
                          }
                        />
                      </label>
                    ))}
                </div>
                <p className="param-warning">
                  Chọn <i class="fas fa-hand-point-up"></i> và đặt (Phí đặt lịch
                  0đ)
                </p>
              </div>
              <div className="col-6 clinic-info-address">
                <div className="clinic-address-title">
                  <strong>Địa chỉ khám</strong>
                </div>
                <div className="clinic-name">
                  <strong>Phòng Khám Chuyên Khoa Da Liễu</strong>
                </div>
                <div className="clinic-address">
                  207 Phố Huế - Hai Bà Trưng - Hà Nội
                </div>
              </div>
              <hr />
            </div>
          </div>
          <button className="btn btn-primary" onClick={handleInfoSchedule}>
            <FormattedMessage id="manage-schedule.save" />
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Doctor;

import React, { useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import moment from "moment";
import "./ManageSchedule.scss";
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
import { LANGUAGES, dateFormat } from "../../../utils/constant";
import { toast } from "react-toastify";
import doctorService from "../../../services/doctorService";
import DoctorExtraInfo from "../../Patient/Doctor/DoctorExtraInfo";
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
  let yesterDay = new Date(new Date().setDate(new Date().getDate() - 1));
  const {
    loggedIn,
    language,
    systemMenuPath,
    AllDoctors,
    appointmentSchedule,
  } = useSelector((state) => {
    return {
      loggedIn: state.user.isLoggedIn,
      language: state.app.language,
      systemMenuPath: state.app.systemMenuPath,
      AllDoctors: state.doctor.AllDoctors,
      appointmentSchedule: state.doctor.allCodescheduleHours,
    };
  });
  useEffect(() => {
    setSelectedDate(new Date());
    if (!AllDoctors || !AllDoctors.length) {
      dispatch(actions.fetchGetAllDoctors());
      return;
    } else {
      setOptions(() => {
        return AllDoctors.map((doctor) => {
          return {
            value: doctor.id,
            label: `${doctor.lastName} ${doctor.firstName} `,
          };
        });
      });
    }
  }, [AllDoctors]);
  useEffect(() => {
    dispatch(actions.fetchAllCodeScheduleHours());
  }, []);
  const handlSelectDoctor = (selectDoctor) => {
    setSelectOption(selectDoctor);
    setInfoSchedule((pres) => {
      return {
        ...pres,
        chosenDoctor: {
          doctorId: selectDoctor.value,
          fullName: selectDoctor.label,
        },
      };
    });
  };
  const handleDateChange = (date) => {
    // Chuyển đổi thành đối tượng Moment
    const momentObject = moment(date[0]);
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
  };
  const handleInfoSchedule = async () => {
    try {
      let result = [];
      if (
        !infoSchedule?.chosenDoctor?.hasOwnProperty("doctorId") ||
        infoSchedule?.chosenDoctor?.doctorId === null
      ) {
        toast.warn(
          <FormattedMessage id="manage-schedule.warring-select-doctor" />
        );
        return;
      }
      if (!infoSchedule?.hasOwnProperty("selectedDate")) {
        toast.warn(
          <FormattedMessage id="manage-schedule.warring-select-date" />
        );
        return;
      }
      if (!infoSchedule?.hasOwnProperty("scheduleHoursList")) {
        toast.warn(
          <FormattedMessage id="manage-schedule.warring-select-schedule-hours" />
        );
      }
      if (infoSchedule?.hasOwnProperty("scheduleHoursList")) {
        infoSchedule.scheduleHoursList.map((element) => {
          const obj = {};
          obj.doctorId = infoSchedule.chosenDoctor.doctorId;
          obj.date = infoSchedule.selectedDate;
          obj.timeType = element;
          result.push(obj);
        });
      }
      const options = {
        doctorCode: infoSchedule.chosenDoctor.doctorId,
        bookingDate: infoSchedule.selectedDate,
        bookingInfoList: result,
      };

      setSelectOption({
        value: null,
        label: "Chose doctor",
      });
      setSelectedDate(new Date());
      setInfoSchedule(null);
      setSelectedAppointment([]);
      const response = await doctorService.handlBulkCreateSchedule(options);
      if (response) {
        toast.success(
          <FormattedMessage id="manage-schedule.success-book-schedule" />
        );
      } else {
        toast.success(
          // <FormattedMessage id="manage-schedule.error-book-schedule" />
          toast.error("Thêm mới lịch hẹn không thànhc công.")
        );
      }
    } catch (error) {
      toast.error("Xảy ra ngoại lệ ", error.message);
    }
  };

  return (
    <React.Fragment>
      <div className="manage-schedule-container">
        <div className="title m-s-title">
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
                minDate={yesterDay}
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
                  <FormattedMessage id="manage-schedule.chosse" />
                  <i className="fas fa-hand-point-up"></i>
                  <FormattedMessage id="manage-schedule.and-book" />
                </p>
              </div>
              <div className="col-6 clinic-info-address">
                <DoctorExtraInfo id={selectDoctor.value} />
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

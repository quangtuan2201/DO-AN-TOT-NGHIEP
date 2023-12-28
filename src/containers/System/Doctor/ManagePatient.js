import React, { useState, useEffect, useCallback } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import moment, { lang } from "moment";
import "./ManagePatient.scss";
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
import { LANGUAGES, dateFormat } from "../../../utils/constant";
import { toast } from "react-toastify";
import doctorService from "../../../services/doctorService";
import patientService from "../../../services/patientService";
import RemedyModal from "./Modal/RemedyModal";
// Hàm để lấy ngày hiện tại dưới dạng yyyy-mm-dd
function ManagePatient() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [listPatientDoctor, setListPatientDoctor] = useState([]);
  const [isShowModal, setIsShowModalConfirm] = useState(false);
  const [dataModal, setDataModal] = useState({});
  let yesterDay = new Date(new Date().setDate(new Date().getDate() - 1));
  const { language, userInfo } = useSelector((state) => {
    // console.log("State : ", state);
    return {
      language: state.app.language,
      userInfo: state.user.userInfo,
    };
  });
  const fetchListPatientDoctor = async (id, date) => {
    try {
      if (!id || !date) {
        console.error("ID or Date missing parameter.");
        return;
      } else {
        console.log("current date: ", date);
        console.log("id: ", id);

        const momentObject = moment(date);
        if (!momentObject.isValid()) {
          console.error("Invalid date format.");
          return;
        }

        const formattedDate = moment(date, "ddd MMM D YYYY")
          .startOf("day")
          .valueOf();

        const response = await patientService.handlGetListPatientDoctor(
          id,
          formattedDate
        );
        console.log("Data: ", response);

        if (response) {
          setListPatientDoctor(response);
        } else {
          setListPatientDoctor([]);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  useEffect(() => {
    console.log("call api");
    fetchListPatientDoctor(userInfo.id, currentDate);
  }, []);

  const handleDateChange = async (date) => {
    const momentObject = moment(date[0]);
    if (!momentObject.isValid() || !userInfo?.id) {
      return;
    } else {
      let formattedDate = new Date(momentObject).getTime();
      setCurrentDate(date[0]);
      const response = await patientService.handlGetListPatientDoctor(
        userInfo.id,
        formattedDate
      );
      console.log("response: ", response);

      if (response) {
        // console.log("response: ", response);
        setListPatientDoctor(response);
      } else {
        setListPatientDoctor([]);
      }
    }
  };
  // const handlShowModal = useCallback(() => {
  //   setIsOpneModal((pre) => !pre);
  // });

  const handlShowModalConfirm = (item) => {
    console.log("patient: ", item);
    const data = {
      doctorId: item?.doctorId,
      patientId: item?.patientId,
      email: item?.patientData?.email,
      timeType: item?.timeType,
      statusId: item?.statusId,
      firstName: item?.patientData?.firstName,
      language,
    };
    console.log("Check Data: ", data);
    setDataModal(data);
    setIsShowModalConfirm(!isShowModal);
  };

  return (
    <React.Fragment>
      <div className="manage-patient-container container">
        <div className="m-p-title text-center">
          <h1>Quản lý bệnh nhân khám bệnh</h1>
        </div>
        <div className="manage-patient-body row">
          <div className="col-4 form-group">
            <label>Chọn ngày khám:</label>
            <DatePicker
              className="form-control"
              minDate={yesterDay}
              onChange={handleDateChange}
              value={currentDate}
            />
          </div>

          <div className="col-12 manage-patient-body">
            <RemedyModal
              isShowModal={isShowModal}
              handlShowModalConfirm={handlShowModalConfirm}
              dataModal={dataModal}
            />
            <table class="table table-hover table-fixed ">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Thời gian</th>
                  <th>Họ và tên</th>
                  <th>Địa chỉ</th>
                  <th>Giới tính</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {Array.isArray(listPatientDoctor) &&
                listPatientDoctor.length > 0
                  ? listPatientDoctor.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            {language === LANGUAGES.VI
                              ? item?.patientTimeType?.valueVn
                              : item?.patientTimeType?.valueEn}
                          </td>
                          <td>{item?.patientData?.firstName}</td>
                          <td>{item?.patientData?.address}</td>
                          <td>
                            {language && language === LANGUAGES.VI
                              ? item.patientData?.genderData?.valueVn
                              : item?.patientData?.genderData?.valueEn}
                          </td>
                          <td>
                            <button
                              className="btn btn-warning pl-2 pr-2"
                              onClick={() => {
                                handlShowModalConfirm(item);
                              }}
                            >
                              Xác nhận
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  : "Không có bệnh nhân nào cả."}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ManagePatient;

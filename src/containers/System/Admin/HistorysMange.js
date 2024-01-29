import { useState, useEffect } from "react";
import "./StatisticsManage.scss";
import Select from "react-select";
import moment from "moment";
import DatePicker from "../../../components/Input/DatePicker";
import userService from "../../../services/userService";
import { dispatch } from "../../../redux";
import * as actions from "../../../store/actions";
import { useSelector } from "react-redux";
import { Bar, Doughnut } from "react-chartjs-2";
import { FormattedMessage, useIntl } from "react-intl";
import "./HistorysManage.scss";
import { toast } from "react-toastify";
import _ from "lodash";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
function HistorysManage() {
  const intl = useIntl();
  const [formData, setFormData] = useState({
    startDateTime: new Date(),
    endDateTime: new Date(),
    doctorId: "",
  });
  const [patients, setPatients] = useState({});
  const [historysData, setHistorysData] = useState(null);
  const [hasChanged, setHasChanged] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [reviewImage, setReviewImage] = useState("");
  const handleDateChange = (date, checkDate) => {
    // Chuyển đổi thành đối tượng Moment
    const momentObject = moment(date);
    console.log("momentObject: ", new Date(momentObject).getTime());
    if (!momentObject.isValid()) {
      console.error("Invalid moment object: ", momentObject);
      return;
    } else {
      setFormData((pre) => ({
        ...pre,
        [checkDate]: date,
      }));
    }
  };
  const { language, allDoctors } = useSelector((state) => {
    return {
      language: state.app.language,
      allDoctors: state.doctor.AllDoctors,
    };
  });
  const openReviewImage = () => {
    if (!reviewImage) {
      return;
    }
    setIsOpen(true);
  };
  const handlSearchHistoryPatient = (keyword, data) => {
    // console.log("data: ", data);
    // console.log("keyword: ", keyword);
    if (keyword === "") {
      setPatients("");
      return;
    }

    const formattedKeyword = keyword.toLowerCase().trim();

    const filteredPatients = data.filter((patient) => {
      const fullName = `${patient?.patientData?.firstName}`;
      const formattedFullName = fullName.toLowerCase();

      return formattedFullName.includes(formattedKeyword);
    });

    // console.log("filteredPatients: ", filteredPatients);
    setPatients(filteredPatients);
  };
  const handleBlur = (e) => {
    // console.log("sự kiện blur: ", e);
    // console.log("Người dùng blur ra khỏi form input ");
    setHasChanged(true);
  };

  const handleSubmit = async (formData) => {
    // console.log("Form data: ", formData);
    if (
      !formData.doctorId ||
      !formData.startDateTime ||
      !formData.endDateTime
    ) {
      toast.error("Hãy chọn các trường, trước khi gửi");
      return;
    }
    const momentStartDate = moment(formData.startDateTime);
    const momentEndDate = moment(formData.endDateTime);

    // Format the date as "YYYY-MM-DD HH:mm:ss"
    var formatedStart = new Date(momentStartDate).getTime();
    var formatedEnd = new Date(momentEndDate).getTime();
    try {
      formData.startDateTime = formatedStart;
      formData.endDateTime = formatedEnd;

      const response = await userService.fetchGetHistorysBookingByDate(
        formData
      );
      if (response) {
        setHistorysData(response);
        // console.log("history data: ", response);
      } else {
        setHistorysData(null);
      }
    } catch (error) {
      console.error("fetch get statistical error ", error);
    }
  };
  useEffect(() => {
    dispatch(actions.fetchGetAllDoctors());
  }, [dispatch, language]);

  return (
    <>
      <div className="history-manage-container">
        <h2 className="text-center title">Quản lý lịch sử đặt lịch khám</h2>
        <div className="row mt-5">
          <div className="col-2">
            <label>
              <strong>
                <FormattedMessage id="manage-statistical.choose-doctor" />
              </strong>
            </label>
            <select
              class="form-control"
              onChange={(e) => {
                setFormData((pre) => ({
                  ...pre,
                  doctorId: e.target.value,
                }));
              }}
            >
              <option value="">
                {/* {intl.formatMessage({
                  id: "manage-statistical.all",
                })} */}
                Chọn
              </option>

              {allDoctors &&
                allDoctors.length > 0 &&
                allDoctors.map((item, index) => {
                  return (
                    <option key={index} value={item.id}>
                      {`${item.firstName} ${item.lastName}`}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="col-2">
            <label>
              <strong>
                <FormattedMessage id="manage-statistical.choose-start-date" />
              </strong>
            </label>
            <DatePicker
              className="form-control"
              onChange={(e) => {
                handleDateChange(e[0], "startDateTime");
              }}
              value={formData?.startDateTime}
            />
          </div>
          <div className="col-2">
            <label>
              <strong>
                <FormattedMessage id="manage-statistical.choose-end-date" />
              </strong>
            </label>
            <DatePicker
              className="form-control"
              minDate={formData?.startDateTime}
              onChange={(e) => {
                handleDateChange(e[0], "endDateTime");
              }}
              value={formData?.endDateTime}
            />
          </div>
          <div className="col-2">
            <label>
              <strong>Tìm kiếm bệnh nhân :</strong>
            </label>
            <input
              className="form-control"
              readOnly={_.isEmpty(historysData)}
              placeholder="Tìm kiếm bệnh nhân"
              onBlur={handleBlur}
              onChange={(e) => {
                handlSearchHistoryPatient(e.target.value, historysData);
              }}
            />
          </div>

          <div className="col-2 ">
            <button
              className="btn btn-danger pl-2 pr-2 mt-3 "
              data-toggle="button"
              onClick={() => {
                handleSubmit(formData);
              }}
            >
              <FormattedMessage id="manage-statistical.submit" />
            </button>
          </div>
          {
            !_.isEmpty(patients) ? (
              <div className="col-12 mt-3">
                <p>
                  <strong>Kết quả: </strong>
                </p>
                <table className="table table-hover table-bordered">
                  {patients.map((item, index) => {
                    return (
                      <tbody>
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.patientData?.firstName}</td>
                          <td>{item?.patientData?.email}</td>
                          <td>{item?.patientData?.genderData?.valueVn}</td>
                          <td>{item?.patientData?.phoneNumber}</td>
                          <td>{item?.patientData?.address}</td>
                          <td>
                            {moment(item?.patientData?.createdAt).format(
                              "DD/MM/YYYY"
                            )}
                          </td>
                          <td>{item?.bookTimeData?.valueVn}</td>
                          <td
                            className={`font-weight-bold 
                ${
                  item.statusId === "S2"
                    ? "s-2"
                    : item.statusId === "S3"
                    ? "s-3"
                    : "s-4"
                }`}
                          >
                            {item?.statusData?.valueVn}
                          </td>
                          <th scope="col">File</th>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            ) : (
              ""
            )
            // (
            //   <div className="col-12 mt-3">
            //     <p className="text-danger">
            //       Từ khóa bạn không phù hợp , vui lòng nhập thông tin chính xác
            //     </p>
            //   </div>
            // )
          }
          <div className="col-12 mt-5">
            <table class="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">STT</th>
                  <th scope="col">Họ và tên</th>
                  <th scope="col">Email</th>
                  <th scope="col">Giới tính</th>
                  <th scope="col">Điện thoại</th>
                  <th scope="col">Địa chỉ</th>
                  <th scope="col">Ngày đặt</th>
                  <th scope="col">khung giờ đặt</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">File</th>
                </tr>
              </thead>
              <tbody>
                {!_.isEmpty(historysData) ? (
                  historysData.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.patientData?.firstName}</td>
                        <td>{item?.patientData?.email}</td>
                        <td>{item?.patientData?.genderData?.valueVn}</td>
                        <td>{item?.patientData?.phoneNumber}</td>
                        <td>{item?.patientData?.address}</td>
                        <td>
                          {moment(item?.patientData?.createdAt).format(
                            "DD/MM/YYYY"
                          )}
                        </td>
                        <td>{item?.bookTimeData?.valueVn}</td>
                        <td
                          className={`font-weight-bold 
                      ${
                        item.statusId === "S2"
                          ? "s-2"
                          : item.statusId === "S3"
                          ? "s-3"
                          : "s-4"
                      }`}
                        >
                          {item?.statusData?.valueVn}
                        </td>
                        <td
                          className="preview-image"
                          style={{
                            backgroundImage: `url(${item?.historysData?.files})`,
                          }}
                          onClick={() => {
                            setReviewImage(item?.historysData?.files);
                            openReviewImage();
                          }}
                        ></td>
                      </tr>
                    );
                  })
                ) : (
                  <p className="text-danger text-center">
                    <strong>Không có dữ liệu</strong>
                  </p>
                )}
              </tbody>
            </table>
            {isOpen === true && (
              <Lightbox
                mainSrc={reviewImage}
                onCloseRequest={() => {
                  setIsOpen(false);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default HistorysManage;

import { memo, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import "./AppointmentSchedule.scss";
import HomeHeader from "../../HomeHeader";
import { LANGUAGES } from "../../../../utils";
import { useSelector } from "react-redux";
import patientService from "../../../../services/patientService";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "../../../../components/Input/DatePicker";

import _ from "lodash";
import moment from "moment";
import { toast } from "react-toastify";

const AppointmentSchedule = () => {
  const [data, setData] = useState(null);
  const { handleSubmit, control, setValue, watch, reset } = useForm();
  const { language } = useSelector((state) => {
    return {
      language: state.app.language,
    };
  });
  const onSubmit = async (data) => {
    try {
      if (!data.date) {
        toast.error("Vui lòng chọn ngày!");
        return;
      }
      let formattedDate = new Date(moment(data.date)).getTime();
      data.date = formattedDate;
      console.log("data: ", data);
      const response = await patientService.handlAppointmentSchedule(data);
      if (response) {
        console.log("fetch data", response);
        setData(response);
        reset({ email: "", date: null });
      } else {
        toast.warn("Không có lịch hẹn nào !");
        setData(null);
      }
    } catch (error) {
      console.error("Fetch get appointment schedule fail", error.message);
    }
  };
  return (
    <>
      <div className="header-search">
        <HomeHeader />
      </div>
      <div className="appointment-schedule-container container">
        <div className="form-container ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="form-appointment-schedule"
          >
            <div className="form-group">
              <label>
                <strong>Nhập email:</strong>
              </label>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Vui lòng nhập email" }}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      type="text"
                      {...field}
                      className="form-control"
                      defaultValue={field.value}
                      placeholder="Nhập email..."
                    />
                    {fieldState.error && (
                      <span style={{ color: "red" }}>
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <div className="form-group ml-5">
              <label>
                <strong>Chọn ngày:</strong>
              </label>
              <Controller
                name="date"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={(date) => setValue("date", date[0])}
                    className="form-control"
                  />
                )}
              />
            </div>
            <button className="btn btn-primary pl-2 pr-2" type="submit">
              Submit
            </button>
            <button
              className="btn btn-warning pl-2 pr-2"
              type="submit"
              onClick={() => {
                setData(null);
              }}
            >
              Clear
            </button>
          </form>
        </div>
        <div className="list-appointment-schedule mt-5">
          <h3 className="text-center mb-3">Lịch hẹn</h3>

          <table class="table table-hover table-fixed ">
            <thead>
              <tr className="text-center">
                <th>STT</th>
                <th>Email</th>
                <th>Tên</th>
                <th>Thời gian</th>
                <th>Ngày đặt</th>
                <th>Quê quán</th>
                <th>Bác sĩ</th>
                <th>Số điện thoại bác sĩ</th>
                <th>Địa chỉ phòng khám</th>
                <th>Tên phòng khám</th>
                <th>Trạng thái</th>
              </tr>
            </thead>

            <tbody>
              {!_.isEmpty(data) ? (
                data.map((item, index) => {
                  return (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item?.patientData?.email}</td>
                      <td>{item?.patientData?.firstName}</td>
                      <td>
                        {language === LANGUAGES.VI
                          ? item?.patientTimeType?.valueVn
                          : item?.patientTimeType?.valueEn}
                      </td>
                      <td>{moment(item?.createdAt).format("DD/MM/YYYY")}</td>
                      <td>{item?.patientData?.address}</td>
                      <td>{`${item?.doctorInfo?.lastName} ${item?.doctorInfo?.firstName}`}</td>
                      <td>{item?.doctorInfo?.phoneNumber}</td>
                      <td>{item?.doctorInfo?.Doctor_Info?.addressClinic}</td>
                      <td>{item?.doctorInfo?.Doctor_Info?.nameClinic}</td>
                      <td className="text-success font-weight-bold">
                        {language === LANGUAGES.VI
                          ? item?.statusData?.valueVn
                          : item?.statusData?.valueEn}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <span className="text-danger">Không có lịch hẹn nào !</span>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default memo(AppointmentSchedule);

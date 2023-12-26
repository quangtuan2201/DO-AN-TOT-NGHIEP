import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from "../../../store/actions";
import specialtyService from "../../../services/specialtyService";
import DoctorSchedule from "../Clinic/DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
import ProfileDoctor from "./ProfileDoctor";
import Select from "react-select";
import "./DetailSpecialty.scss";
import userService from "../../../services/userService";
import { useSelector } from "react-redux";
import { LANGUAGES } from "../../../utils";

function DetailSpecialty() {
  const { id } = useParams();
  let maxLength = 400;
  const [detailSpecialty, setDetailSpecialty] = useState(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [arrDoctorId, setArrDoctorId] = useState([]);
  const [doctorProvince, setDoctorProvince] = useState([]);
  const [checkLang, setCheckLang] = useState(false);

  const { language } = useSelector((state) => {
    // console.log("state: ", state);
    return { language: state.app.language };
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await specialtyService.handlGetSpecialtyById(
          id,
          "ALL"
        );
        // console.log("Danh sách chuyên khoa: ", response);
        setDetailSpecialty(response);
        setArrDoctorId(response.doctorSpecilty);
      } catch (error) {
        console.error(
          `Fetch get detail specialty id ${id} failed: ${error.message}`
        );
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  useEffect(() => {
    try {
      if (!language) {
        language = "vi";
      }
      const checkLang = language && language === LANGUAGES.VI;

      (async () => {
        const provinces = await userService.getAllCode("PROVINCE");
        const { data, errCode } = provinces.data;
        console.log("Province: ", data);

        if (data && errCode === 0) {
          console.log("Đa ta: ", data);
          let dataConvert = data.map((item) => {
            return {
              label: checkLang ? item?.valueVn : item?.valueEn,
              value: item.keyMap,
            };
          });
          dataConvert.unshift({
            label: checkLang ? "Tất cả" : "All",
            value: "ALL",
          });
          console.log("====>>> data: ", dataConvert);
          if (Array.isArray(dataConvert) && dataConvert.length > 0) {
            setDoctorProvince(dataConvert);
          } else setDoctorProvince([]);
        }
      })();
    } catch (error) {
      console.log("", error.message);
    }
  }, [language, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }
  const handlOnChangeProvince = async (doctorProvince) => {
    // console.log("Tỉnh thành: ", e.target.value);
    console.log("Province: ", doctorProvince);
    // setDoctorProvince(doctorProvince);
    try {
      const response = await specialtyService.handlGetSpecialtyById(
        id,
        doctorProvince?.value
      );
      console.log("Lọc doctor qua keyMap: ", response);
      const { doctorSpecilty } = response;
      if (Array.isArray(doctorSpecilty) && doctorSpecilty.length > 0) {
        setArrDoctorId(doctorSpecilty);
      } else {
        setArrDoctorId("Không có bác sĩ nào.");
      }
    } catch (error) {
      console.error("Lọc Bác sĩ fail !");
    }
  };
  return (
    <>
      <div className="detail-specialty-container ">
        <div>
          <HomeHeader />
        </div>
        <div className="detail-specialty-body">
          <div
            className={`container description-specialty ${
              showFullDescription ? "show-full-description" : ""
            } `}
          >
            <div
              className="detail-info-specialty mt-3"
              dangerouslySetInnerHTML={{
                __html: showFullDescription
                  ? detailSpecialty?.descriptionHTML
                  : detailSpecialty?.descriptionHTML.slice(0, maxLength) +
                    "...",
              }}
            ></div>
            {detailSpecialty?.descriptionHTML.length > maxLength && (
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
              >
                {showFullDescription ? "Ẩn bớt" : "Hiện thêm"}
              </button>
            )}
          </div>
          <div className="col-2 ">
            {/* <Select
              options={[
                { label: "Hà Nội", value: "PR1" },
                { label: "Hồ Chí Minh", value: "PR2" },
                { label: "Hải Phòng", value: "PR3" },
                { label: "Quảng Ninh", value: "PR4" },
              ]}
              onChange={handlOnChangeProvince}
              value={doctorProvince}
              // className="form-control"
            /> */}
            {/* <label>Chọn tỉnh thành</label>
            <select onChange={handlOnChangeProvince}>
              <option value={"PR1"}>Hà Nội</option>
              <option value={"PR2"}>Hồ Chí Minh</option>
              <option value={"PR3"}>Hải Phòng</option>
              <option value={"PR4"}>Quảng Ninh</option>
            </select>
            <label>Chọn tỉnh thành</label> */}
            <Select
              options={doctorProvince}
              onChange={handlOnChangeProvince}
              // isSearchable={true} // Cho phép tìm kiếm trong dropdown
              placeholder="Chọn tỉnh thành"
            />
          </div>
          <div>
            {Array.isArray(arrDoctorId) && arrDoctorId.length > 0
              ? arrDoctorId.map((item, index) => {
                  return (
                    <div className="each-doctor" key={index}>
                      <div className="detail-content-left">
                        <div className="profile-doctor">
                          {console.log("PROFILE ID : ", item.doctorId)}
                          <ProfileDoctor
                            id={item.doctorId}
                            isShowDescription={true}
                          />
                        </div>
                      </div>
                      <div className="detail-content-right">
                        <div className="doctor-schedule">
                          <DoctorSchedule id={item.doctorId} />;
                        </div>
                        <div className="doctor-extra-info">
                          <DoctorExtraInfo id={item.doctorId} />
                        </div>
                      </div>
                    </div>
                  );
                })
              : "Không có bác sĩ nào."}
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailSpecialty;

import "./OutStandingDoctor.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage, useIntl } from "react-intl";
import * as actions from "../../../store/actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { path } from "../../../utils";
import background_Outsanding from "../../../assets/background_OutStanding_Doctor.png";
// Import css files
function OutStandingDoctor(props) {
  const [thumbnail, setThumbnail] = useState("");
  const [seemore, setSeeMore] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    // if (seemore === false) {
    //   dispatch(actions.fetchTopDoctor(15));
    // } else {
    dispatch(actions.fetchTopDoctor(8));
    // }
  }, []);
  const { language, topDoctors } = useSelector((state) => {
    // console.log("top doctor: ", state.doctor.topDoctors);
    return {
      language: state.app.language,
      topDoctors: state.doctor.topDoctors,
    };
  });
  const handleViewDetailDoctor = (doctor) => {
    history.push(`/detail-doctors/${doctor.id}`);
  };
  const getThumbnail = (imagebuffer) => {
    let imageBase64 = "";
    if (imagebuffer && typeof imagebuffer === "object") {
      imageBase64 = Buffer.from(imagebuffer, "base64").toString("binary");
      return imageBase64;
    }
    return imageBase64;
  };

  return (
    <React.Fragment>
      <div
        className="section-specialty section-share outstandingDoctor "
        style={{
          backgroundImage: `url("${background_Outsanding}")`,
          paddingBottom: "30px",
        }}
      >
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="homePage.prominent-doctor" />
            </span>
            <button
              className="btn-section"
              onClick={() => {
                setSeeMore((present) => {
                  return !present;
                });
              }}
            >
              <FormattedMessage id="homePage.see-more" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...props.settings}>
              {topDoctors &&
                topDoctors.map((doctor, index) => (
                  <div
                    className="section-customize "
                    style={{ display: "none" }}
                    key={index}
                    onDoubleClick={() => {
                      handleViewDetailDoctor(doctor);
                    }}
                  >
                    <div
                      className="bg-image section-outstanding-doctor "
                      style={{
                        backgroundImage: `url(${getThumbnail(doctor?.image)})`,
                      }}
                    />

                    <div className="section-customize-content">
                      <div className="section-descrip mi-5">
                        <div>
                          {` ${
                            language == "vi"
                              ? doctor.positionData.valueVn
                              : doctor.positionData.valueEn
                          }.${
                            language === "vi"
                              ? `${doctor.lastName} ${doctor.firstName}`
                              : `${doctor.firstName} ${doctor.lastName}`
                          }`}
                        </div>
                      </div>
                      <div>{doctor?.Doctor_Info?.specialtyData?.name}</div>
                    </div>
                  </div>
                ))}
            </Slider>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default OutStandingDoctor;

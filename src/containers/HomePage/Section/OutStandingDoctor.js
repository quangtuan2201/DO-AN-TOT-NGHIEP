import "./OutStandingDoctor.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import { FormattedMessage, useIntl } from "react-intl";
import * as actions from "../../../store/actions";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { path } from "../../../utils";
import { lang } from "moment";
// Import css files
function OutStandingDoctor(props) {
  const [thumbnail, setThumbnail] = useState("");
  const [seemore, setSeeMore] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    // console.log("seemore last:", seemore);
    if (seemore === false) {
      dispatch(actions.fetchTopDoctor(15));
    } else {
      dispatch(actions.fetchTopDoctor(8));
    }
  }, [seemore]);
  const { language, topDoctors } = useSelector((state) => {
    // console.log("state stote in OutStanding", state);
    return {
      language: state.app.language,
      topDoctors: state.doctor.topDoctors,
      // allDoctors: state.doctor.allDoctors,
    };
  });
  const handleViewDetailDoctor = (doctor) => {
    // console.log("handle click view: ", doctor);
    history.push(`/detail-doctors/${doctor.id}`);
  };
  const getThumbnail = (imagebuffer) => {
    let imageBase64 = "";
    // console.log("imagebuffer: ", imagebuffer, typeof imagebuffer);
    if (imagebuffer && typeof imagebuffer === "object") {
      imageBase64 = Buffer.from(imagebuffer, "base64").toString("binary");
      // new Buffer(imagebuffer, "base64").toString("binary");
      // console.log("Is Image base64");
      return imageBase64;
    }
    return imageBase64;
  };

  const renderAllDoctor = (allDoctors) => {
    const containerStyle = {
      height: "700px", // Có thể là px, em, rem, %, etc.
      // backgroundColor: 'lightgray', // Các thuộc tính CSS khác nếu cần
      // padding: '10px',
      boxSizing: "border-box",
    };

    return (
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>STT</th>
              <th>
                <FormattedMessage id="user-manage.firstName" />
              </th>
              <th>
                <FormattedMessage id="user-manage.lastName" />
              </th>
              <th>
                <FormattedMessage id="user-manage.address" />
              </th>
              {/* <th>
                <FormattedMessage id="user-manage.phoneNumber" />
              </th> */}
              <th>
                <FormattedMessage id="user-manage.gender" />
              </th>
              <th>
                <FormattedMessage id="user-manage.position" />
              </th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            {allDoctors &&
              allDoctors?.map((doctor, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{doctor.firstName}</td>
                  <td>{doctor.lastName}</td>
                  <td>{doctor.address}</td>
                  {/* <td>{doctor.phoneNumber}</td> */}
                  <td>
                    {language === "vi"
                      ? doctor.genderData.valueVn
                      : doctor.genderData.valueEn}
                  </td>
                  <td>
                    {language === "vi"
                      ? doctor.positionData.valueVn
                      : doctor?.positionData.valueEn}
                  </td>
                  <td>
                    <a href="#">Click me!</a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <React.Fragment>
      <div
        className="section-specialty section-share "
        style={
          seemore === false
            ? { height: "500px", boxSizing: "border-box", border: "none" }
            : {}
        }
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
                  // console.log("present seemore: ", present);
                  return !present;
                });
              }}
            >
              <FormattedMessage id="homePage.see-more" />
            </button>
          </div>
          <div className="section-body">
            {seemore ? (
              <Slider {...props.settings}>
                {topDoctors &&
                  topDoctors.map((doctor, index) => (
                    <div
                      className="section-customize"
                      key={index}
                      onDoubleClick={() => {
                        handleViewDetailDoctor(doctor);
                      }}
                    >
                      <div className="customize-border">
                        <div className="bg-outer text-center">
                          <div
                            className="bg-image section-outstanding-doctor "
                            style={{
                              backgroundImage: `url(${getThumbnail(
                                doctor?.image
                              )})`,
                            }}
                          />

                          <div className="section-descrip">
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
                          <br></br>
                          <div className="section-descrip">Gia liễu</div>
                        </div>
                      </div>
                    </div>
                  ))}
              </Slider>
            ) : (
              renderAllDoctor(topDoctors)
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default OutStandingDoctor;

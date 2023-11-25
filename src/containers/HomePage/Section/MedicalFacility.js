import "./MedicalFacility.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
// Import css files
import { FormattedMessage, useIntl } from "react-intl";

function MedicalFacility(props) {
  return (
    <React.Fragment>
      <div className="section-specialty section-share ">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...props.settings}>
              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <span className="section-descrip">
                  Bệnh viện hữu nghị việt đức
                </span>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility"></div>
                <span className="section-descrip">Bệnh viện chợ rẫy</span>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <span className="section-descrip">
                  Phòng khám Bệnh viện Đại Học Y Dược 1
                </span>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <span className="section-descrip">
                  Trung tâm Khám sức khỏe định ký , bệnh viện trung ương Quân
                  đội 108
                </span>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <span className="section-descrip">
                  Bệnh viện Ung bướu Hưng việt
                </span>
              </div>
              <div className="section-customize">
                <div className="bg-image section-medical-facility" />
                <span className="section-descrip">
                  Hệ thống Y tế Thu Cúc TCI
                </span>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default MedicalFacility;

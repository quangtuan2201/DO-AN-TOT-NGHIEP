// function Specialty() {}
import "./Specialty.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
// Import css files

import { FormattedMessage, useIntl } from "react-intl";

function Specialty(props) {
  return (
    <React.Fragment>
      <div className="section-specialty section-share ">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="popularSpeciality.popularSpeciality" />
            </span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...props.settings}>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <span className="section-descrip">Cơ xương khớp</span>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty"></div>
                <span className="section-descrip">Cơ xương khớp</span>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <span className="section-descrip">Cơ xương khớp</span>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <span className="section-descrip">Cơ xương khớp</span>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <span className="section-descrip">Cơ xương khớp</span>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <span className="section-descrip">Cơ xương khớp</span>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Specialty;

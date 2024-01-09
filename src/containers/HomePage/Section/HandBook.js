// function Specialty() {}
import "./HandBook.scss";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
// Import css files

function HandBook(props) {
  return (
    <React.Fragment>
      <div className="section-specialty section-share ">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="handbook.hand-book" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homePage.see-more" />{" "}
            </button>
          </div>
          <div className="section-body">
            <Slider {...props.settings}>
              <div className="section-customize">
                <div className="bg-image section-handbook" />
                <span className="section-descrip">Cơ xương khớp</span>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook"></div>
                <span className="section-descrip">Cơ xương khớp</span>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook" />
                <span className="section-descrip">Cơ xương khớp</span>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook" />
                <span className="section-descrip">Cơ xương khớp</span>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook" />
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
export default HandBook;

// function Specialty() {}
// import "./HandBook.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";

function HomeFooter() {
  return (
    <React.Fragment>
      <div className="home-footer">
        {/* <h1>HomeFooter</h1> */}
        <p>
          &copy; 2023 Nguyễn Tuấn Anh.{" "}
          <a target="_blank" href="https://www.facebook.com/quagntuann.dev">
            Morinfo.&#8594;click here&#8592;
          </a>
        </p>
      </div>
    </React.Fragment>
  );
}
export default HomeFooter;
//src/containers/HomePage/HomeFooter.js

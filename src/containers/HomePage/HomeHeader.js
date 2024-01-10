import "./HomeHeader.scss";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguageApp } from "../../store/actions/appActions";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { path } from "../../utils/constant";

//src/store/actions/appActions.js
import { LANGUAGES } from "../../utils/constant";

function HomeHeader({ isShowHeader }) {
  const intl = useIntl();
  const dispatch = useDispatch();
  const history = useHistory();
  const language = useSelector((state) => {
    return state.app.language;
  });
  const switchToEnglish = () => {
    dispatch(changeLanguageApp(LANGUAGES.EN));
    // localStorage.setItem("appLanguage", LANGUAGES.EN); // Thay đổi từ setLanguage sang changeLanguage
  };

  const switchToVietnamese = () => {
    dispatch(changeLanguageApp(LANGUAGES.VI));
    // localStorage.setItem("appLanguage", LANGUAGES.VI); // Thay đổi từ setLanguage sang changeLanguage
  };
  const returnHome = () => {
    // alert("Return Home !");
    history.push(path.HOMEPAGE);
  };
  const redirectSearch = () => {
    // alert("Return Home !");
    history.push(path.SEARCH);
  };
  const redirectSupport = () => {
    // alert("Return Home !");
    history.push(path.SUPPORT);
  };
  const redirectSpecialty = () => {
    // alert("Return Home !");
    history.push(path.SEARCH);
  };

  return (
    <React.Fragment>
      <header>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i className="fas fa-bars icon-menu"></i>
              <div className="header-logo" onClick={returnHome}></div>
            </div>

            <div className="center-content">
              <div className="child-content" onClick={redirectSearch}>
                <div className="">
                  <b>
                    <FormattedMessage id="homeHeader.speciality" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeHeader.searchDoctor" />
                </div>
              </div>
              <div className="child-content" onClick={redirectSearch}>
                <div className="">
                  <b>
                    <FormattedMessage id="homeHeader.healthFacility" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeHeader.selectRoom" />
                </div>
              </div>
              <div className="child-content" onClick={redirectSearch}>
                <div className="">
                  <b>
                    <FormattedMessage id="homeHeader.doctor" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeHeader.selectDoctor" />
                </div>
              </div>
              <div className="child-content" onClick={redirectSearch}>
                <div className="">
                  <b>
                    <FormattedMessage id="homeHeader.fee" />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id="homeHeader.checkHealth" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support" onClick={redirectSupport}>
                <i className="fas fa-question-circle">
                  <FormattedMessage id="homeHeader.support" />
                </i>
              </div>
              <div className="language-vi">
                <span
                  className={language === "vi" ? "active" : ""}
                  onClick={switchToVietnamese}
                >
                  VN
                </span>
              </div>
              <div className="language-en">
                <span
                  className={language === "en" ? "active" : ""}
                  onClick={switchToEnglish}
                >
                  EN
                </span>
              </div>
            </div>
            <div></div>
          </div>
        </div>
        {isShowHeader && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title1">
                <FormattedMessage id="banner.title1" />
              </div>
              <div className="title2">
                <FormattedMessage id="banner.title2" />
              </div>
              <div className="search">
                <input
                  type="text"
                  placeholder={intl.formatMessage({ id: "banner.searchInput" })}
                  onClick={redirectSearch}
                />
                <i className="fas fa-search"></i>
              </div>
            </div>
            <div className="content-down">
              <div className="options">
                <div className="option-child">
                  <div className="icon-child">
                    <i className="far fa-hospital"></i>
                  </div>
                  <div className="text-child" onClick={redirectSpecialty}>
                    <FormattedMessage id="banner.specialty" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-mobile-alt"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.removeHealth" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-stethoscope"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.generalityHealth" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-vial"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.medicalTesting" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-user-md"></i>
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.mentalHealth" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="icon-child">
                    <i className="fas fa-briefcase-medical"></i>
                    {/* <i class="fa-solid fa-tooth"></i> */}
                  </div>
                  <div className="text-child">
                    <FormattedMessage id="banner.dentalExamination" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </React.Fragment>
  );
}
export default HomeHeader;
// export ={ switchToEnglish, switchToVietnamese };

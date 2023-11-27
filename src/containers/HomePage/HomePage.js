import React, { Component, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import Specialty from "../HomePage/Section/Specialty";
import MedicalFacility from "../HomePage/Section/MedicalFacility";
import OutStandingDoctor from "../HomePage/Section/OutStandingDoctor";
import Abount from "../HomePage/Section/Abount";
import HomeFooter from "../HomePage/HomeFooter";
import HandBook from "./Section/HandBook";
import { changeLanguageApp } from "../../store/actions/appActions";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomePage({ isLoggedIn }) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
  };
  const dispatch = useDispatch();
  useEffect(() => {
    // Kiểm tra localStorage khi tải lại trang

    const storedLanguage = localStorage.getItem("appLanguage");
    if (storedLanguage) {
      // Nếu có trạng thái ngôn ngữ đã lưu trữ, đặt ngôn ngữ mặc định
      dispatch(changeLanguageApp(storedLanguage));
    }
  }, []);
  return (
    <React.Fragment>
      <div>
        <HomeHeader />
        <Specialty settings={settings} />
        <MedicalFacility settings={settings} />
        <OutStandingDoctor settings={settings} />
        <HandBook settings={settings} />
        <Abount />
        <HomeFooter />
      </div>
    </React.Fragment>
  );
  //  (<Specialty />);

  //   <Redirect to={linkToRedirect} />;
}

// const mapStateToProps = (state) => {
//   return {
//     isLoggedIn: state.user.isLoggedIn,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

export default HomePage;

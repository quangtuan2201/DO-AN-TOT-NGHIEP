import React, { Component, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import Specialty from "../HomePage/Section/Specialty";
import MedicalFacility from "../HomePage/Section/MedicalFacility";
import OutStandingDoctor from "../HomePage/Section/OutStandingDoctor";
import Abount from "../HomePage/Section/Abount";
import HomeFooter from "../HomePage/HomeFooter";
import HandBook from "./Section/HandBook";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Chatbot from "./Chatbot";

function HomePage({ isLoggedIn }) {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  const dispatch = useDispatch();
  return (
    <React.Fragment>
      <div>
        <HomeHeader isShowHeader={true} />
        <Specialty settings={settings} />
        <MedicalFacility settings={settings} />
        <OutStandingDoctor settings={settings} />
        <HandBook settings={settings} />
        <Abount />
        <Chatbot />
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

import React, { Component } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";

// class Header extends Component {
//   render() {
//     const { processLogout } = this.props;

//     return (
//       <div className="header-container">
//         {/* thanh navigator */}
//         <div className="header-tabs-container">
//           <Navigator menus={adminMenu} />
//         </div>

//         {/* nút logout */}
//         <div className="btn btn-logout" onClick={processLogout}>
//           <i className="fas fa-sign-out-alt"></i>
//         </div>
//       </div>
//     );
//   }
// }
function Header({ processLogout }) {
  console.log("processLogout", processLogout);
  const dispatch = useDispatch();
  const language = useSelector((state) => {
    console.log("language:", state);
    // console.log("isLoggin:"state.user)

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

  return (
    /**/

    <div className="header-container">
      {/* thanh navigator */}
      <div className="header-tabs-container">
        <Navigator menus={adminMenu} />
      </div>
      <div className="languages">
        <span
          className={`language_vn ${language === "vi" ? "active" : ""} `}
          onClick={switchToVietnamese}
        >
          VN
        </span>
        <span
          className={`language_en ${language === "en" ? "active" : ""} `}
          onClick={switchToEnglish}
        >
          EN
        </span>
        <div className="btn btn-logout" onClick={processLogout}>
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>

      {/* nút logout */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

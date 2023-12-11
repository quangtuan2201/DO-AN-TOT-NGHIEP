import React, { Component } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";
import { FormattedMessage, useIntl } from "react-intl";

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
function Header() {
  // console.log("processLogout", processLogout);
  const dispatch = useDispatch();
  const { language, userInfo } = useSelector((state) => {
    return {
      language: state.app.language,
      userInfo: state.user.userInfo,
    };
  });

  const switchToEnglish = () => {
    dispatch(changeLanguageApp(LANGUAGES.EN));
  };
  const switchToVietnamese = () => {
    dispatch(changeLanguageApp(LANGUAGES.VI));
  };

  return (
    <div className="header-container">
      {/* thanh navigator */}
      <div className="header-tabs-container">
        <Navigator menus={adminMenu} />
      </div>
      <div className="languages">
        <span className="wellcome">
          <FormattedMessage id="homeHeader.wellcome" />
          {userInfo?.firstName}
        </span>
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
        {/* nút logout */}
        <div
          className="btn btn-logout"
          onClick={() => {
            dispatch(actions.processLogout());
          }}
        >
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     isLoggedIn: state.user.isLoggedIn,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     processLogout: () => dispatch(actions.processLogout()),
//   };
// };

export default Header;

import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils/constant";
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
  const [menuApp, setMenuApp] = useState([]);
  const { language, userInfo } = useSelector((state) => {
    return {
      language: state.app.language,
      userInfo: state.user.userInfo,
    };
  });
  useEffect(() => {
    // let menu =[];
    // console.log("UserInfo: ", userInfo);
    if (userInfo && Object.keys(userInfo).length > 0) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        // console.log("IS ADMIN");
        setMenuApp(adminMenu);
      } else if (role === USER_ROLE.DOCTOR) {
        // console.log("IS DOCTOR");
        setMenuApp(doctorMenu);
      }
    } else {
      console.log("IS ...");
    }
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
        <Navigator menus={menuApp} />
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

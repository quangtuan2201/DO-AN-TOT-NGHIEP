import React, { Component, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, doctorMenu } from "./menuApp";
import "./Header.scss";
import { LANGUAGES, USER_ROLE } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions/appActions";
import { FormattedMessage, useIntl } from "react-intl";

function Header() {
  const dispatch = useDispatch();
  const [menuApp, setMenuApp] = useState([]);
  const { language, userInfo } = useSelector((state) => {
    return {
      language: state.app.language,
      userInfo: state.user.userInfo,
    };
  });
  useEffect(() => {
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        setMenuApp(adminMenu);
      } else if (role === USER_ROLE.DOCTOR) {
        setMenuApp(doctorMenu);
      }
    } else {
      console.error("Phân quyền xảy ra lỗi hoặc một lý do khác ...");
    }
  }, [userInfo]);

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

export default Header;

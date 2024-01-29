import React, { useState } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "./Login.scss";
import { useIntl, FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { path } from "../../utils/constant";
import "./ForgotPassword";
import { toast } from "react-toastify";
import userService from "../../services/userService";
function ForgotPassword() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const language = useSelector((state) => state.app.language);
  const handleOnChangeEmail = (e) => {
    let isEmail = e.target.value;

    setEmail(isEmail);
  };
  const handleOnSubmitCheckEmail = async (email, language) => {
    if (!email) {
      toast.error("Email không được để trống !");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email, language);
    if (!isEmailValid) {
      toast.error("Email không đúng định dạng");
      return;
    }
    const response = await userService.fetchForgotPassword(email, language);
    if (response) {
      toast.success("Xác thực email thành công!");
      setEmail("");
      history.push(path.VERIFY_CODE, { email });
    } else {
      toast.error("Xác thực email không thành công!");
      console.error("Forgot password error");
    }
  };
  return (
    <>
      <h1 className="text-center">Forgot password</h1>
      <div className="forgot-password-container container">
        <div className="form-verify-email form-group">
          <label className="form-label">Nhập Email của bạn:</label>
          <input
            type="email"
            className="form-control"
            placeholder="Nhập email..."
            onChange={handleOnChangeEmail}
            value={email}
          />
        </div>
        <div className="submit ">
          <button
            className="btn btn-primary pl-3 pr-3 "
            onClick={() => {
              handleOnSubmitCheckEmail(email, language);
            }}
          >
            Gửi
          </button>
        </div>
      </div>
    </>
  );
}
export default ForgotPassword;

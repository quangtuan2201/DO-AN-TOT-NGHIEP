import React, { useState } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import "./Login.scss";
import { useIntl, FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../utils/constant";

function Login(props) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const intl = useIntl();
  const { language, userInfo, navigate } = useSelector((state) => {
    return {
      language: state.app.language,
      userInfo: state.user.userInfo,
    };
  });

  //[handele submit]
  const handleLogin = (data) => {
    dispatch(actions.fetchUserLogin(data));
    setValue("email", "");
    setValue("password", "");
  };
  //[handele togglePass]
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  //handle Enter pass
  const handleEnterKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(handleLogin)();
    }
  };
  //on chang language
  const onChangeLanguage = () => {
    // setLanguage(!language);
    if (language === LANGUAGES.VI) {
      // alert("Change EN");
      dispatch(actions.changeLanguageApp(LANGUAGES.EN));
    } else {
      dispatch(actions.changeLanguageApp(LANGUAGES.VI));
      // alert("Chang VI");
    }
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content row">
          <div className="col-12 login-text">
            <FormattedMessage id="login.login" />
            <div className="active_language">
              <div className="language" onClick={onChangeLanguage}>
                {language === LANGUAGES.VI ? "VI" : "EN"}
              </div>
            </div>
          </div>

          <form
            className="container form-login"
            onSubmit={handleSubmit(handleLogin)}
          >
            <div className="form-login-container">
              <label className="form-label font-weight-bold">
                <FormattedMessage id="user-manage.email" />
              </label>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                rules={{
                  required: intl.formatMessage({
                    id: "user-manage.enterEmail",
                  }),
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: intl.formatMessage({
                      id: "user-manage.invalidEmail",
                    }),
                  },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      type="email"
                      className="form-control"
                      placeholder={`${intl.formatMessage({
                        id: "user-manage.enter",
                      })} ${intl.formatMessage({ id: "user-manage.email" })}`}
                      {...field}
                    />
                    {fieldState.invalid && (
                      <div className="invalid-feedback">
                        {fieldState?.error?.message || "Invalid input"}
                      </div>
                    )}
                  </>
                )}
              />
            </div>
            <div className="form-login-password font-weight-bold">
              <label className="form-label" style={{ marginTop: "20px" }}>
                <FormattedMessage id="user-manage.password" />
              </label>
              <Controller
                type={showPassword ? "text" : "password"}
                name="password"
                control={control}
                defaultValue=""
                rules={{
                  required: intl.formatMessage({
                    id: "user-manage.enterPassword",
                  }),
                  minLength: {
                    value: 6,
                    message: intl.formatMessage({
                      id: "user-manage.passwordLength",
                    }),
                  },
                }}
                render={({ field, fieldState }) => (
                  <>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`input-password form-control ${
                        fieldState.invalid ? "is-invalid" : ""
                      }`}
                      placeholder={`${intl.formatMessage({
                        id: "user-manage.enter",
                      })} ${intl.formatMessage({
                        id: "user-manage.password",
                      })}`}
                      {...field}
                      readOnly={false}
                    />
                    {/* <button
                      type="button"
                      className="border-0 mt-3"
                      onClick={handleTogglePassword}
                      style={{ float: "right", fontSize: "13px" }}
                    >
                      {showPassword ? (
                        <FormattedMessage id="login.show" />
                      ) : (
                        <FormattedMessage id="login.hide" />
                      )}
                    </button> */}
                    <i
                      className={`showPassword ${
                        showPassword ? "fas fa-eye" : "fas fa-eye-slash"
                      }`}
                      // style={{
                      //   float: "right",
                      //   fontSize: "20px",
                      //   marginTop: "10px",
                      //   marginBottom: "10px",
                      // }}
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    ></i>
                    {fieldState.invalid && (
                      <div className="invalid-feedback">
                        {fieldState?.error?.message || "Invalid input"}
                      </div>
                    )}
                  </>
                )}
              />
            </div>
            <div className="col-12 form-group">
              <button
                type="submit"
                className="col-12 btn-login"
                onKeyDown={handleEnterKeyPress}
              >
                {intl.formatMessage({ id: "user-manage.login" })}
              </button>
            </div>
          </form>

          <div className="col-12">
            <span className="forgot-password">
              <FormattedMessage id="login.oblivion" />
            </span>
          </div>
          <div className="col-12 text-center">
            <span className="">
              <FormattedMessage id="login.or-login-with" />
            </span>
          </div>
          <div className="col-12 social-login text-center">
            <i className="fab fa-google google"></i>
            <i className="fab fa-facebook facebook"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

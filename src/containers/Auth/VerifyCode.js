import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./VerifyCode.scss";
import { toast } from "react-toastify";
import userService from "../../services/userService";
import { path } from "../../utils/constant";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const VerifyCode = ({ location }) => {
  const history = useHistory();
  const email = location.state ? location.state.email : null;
  const [showPassword, setShowPassword] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;
    if (password !== confirmPassword) {
      toast.error("Mật khẩu không trùng khớp !");
      return;
    }
    const formData = { email, newPassword: data.password, code: data.code };
    const response = await userService.fetchVerifyCode(formData);
    if (response) {
      toast.success("Cập nhật mật khẩu thành công.");
      reset({ code: "", password: "", confirmPassword: "" });
      history.push(path.LOGIN);
    } else {
      toast.error("Cập nhật mật khẩu thất bại.");
    }
  };

  return (
    <>
      <div className="verify-code-container container">
        <div className="title text-center">Cập nhật mật khẩu</div>
        <div className="form-verify-code"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="code">
            <label>
              <strong>Nhập mã code:</strong>
            </label>
            <input
              className="form-control"
              type="text"
              {...register("code", {
                required: "Code is required",
                maxLength: {
                  value: 6,
                  message: "Code maximum 6 characters",
                },
              })}
            />
            {errors.code && (
              <p className="error-message">{errors.code.message}</p>
            )}
          </div>
          <div className=" password update-password">
            <label>
              <strong>Nhập Password mới:</strong>
            </label>
            <input
              className="form-control"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            <i
              className={`showPassword ${
                showPassword ? "fas fa-eye" : "fas fa-eye-slash"
              }`}
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            ></i>
            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>
          <div className=" confirm-password">
            <label>
              <strong>Nhập lại password mới:</strong>
            </label>
            <input
              className="form-control"
              type={showPassword ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />

            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button className="btn btn-primary mt-3 pl-2 pr-2" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};
export default VerifyCode;

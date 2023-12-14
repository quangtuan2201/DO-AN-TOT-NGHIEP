import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { useDispatch, useSelector } from "react-redux";
import { LANGUAGES, CommonUtils } from "../../../utils";
import { FormattedMessage, useIntl } from "react-intl";
import * as actions from "../../../store/actions";
import TableManageUser from "./TableManageUser";
import UserAdmin from "./UserAdmin";
import "./UserRedux.scss";

function UserRedux() {
  const intl = useIntl();
  const dispatch = useDispatch();
  // console.log("useDispatch: ", useDispatch);
  // console.log("option dispatch: ", dispatch);
  const [isOpen, setIsOpen] = useState(false);
  const [imageUpload, setImageUpload] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const dataReducer = useSelector((state) => {
    // console.log("state", state);
    return {
      language: state.app.language,
      genders: state.admin.gender,
      positions: state.admin.positions,
      roles: state.admin.roles,
      isLoadingKeys: state.admin.isLoadingKeys,
      allUser: state.admin.allUser,
    };
  });
  useEffect(() => {
    const getStateDispatch = () => {
      dispatch(actions.fetchKeysStart(["ROLE", "POSITION", "GENDER"]));
      dispatch(actions.fetchGetUserStart());
    };
    getStateDispatch();
  }, []);

  const handleOnChangeImage = async (e) => {
    let file = e.target.files[0];
    console.log("FILE NAME: ", file.name);
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      // console.log("Base64 image: ", base64);
      let objectURL = URL.createObjectURL(file);
      setImageUpload(base64);
      setAvatar(base64);
    }
  };

  const openReviewImage = () => {
    if (!imageUpload) {
      return;
    }
    setIsOpen(true);
  };

  const handleSaveUser = (data) => {
    try {
      data.image = avatar;
      if (editingUser) {
        // data.image = imageUpload;
        const changeFields = Object.keys(data).filter((key) => {
          console.log(
            key,
            ":",
            data[key],
            data[key] !== editingUser[key],
            "editingUser[key]: ",
            editingUser[key]
          );
          return data[key] !== editingUser[key];
        });
        console.log("changeFiled: ", changeFields);
        const updateUserData = {};
        changeFields.forEach((field) => {
          updateUserData[field] = data[field];
        });
        dispatch(
          actions.fetchUpdateUser({
            ...updateUserData,
            id: editingUser.id,
          })
        );
      } else {
        dispatch(actions.fetchCreateUserStart(data));
      }
      // Reset các trạng thái
      setAvatar(null);
      setImageUpload(null);
      setEditingUser(null);
      reset();
    } catch (error) {
      console.log(`Xảy ra ngoại lệ khi lưu user ${error}`);
    }
  };
  const handleUpdateUser = (user) => {
    // Lưu trạng thái người dùng đang chỉnh sửa
    // Fill dữ liệu người dùng vào form
    let imageBase64 = "";
    console.log("User fuction handleUpdateUser: ", user);
    if (user.image && typeof user.image === "object") {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
      setImageUpload(imageBase64);
    } else if (user.image && typeof user.image === "string") {
      setImageUpload(user.image);
    }
    setEditingUser(user);
    setValue("email", user.email);
    setValue("password", user.password);
    setValue("firstName", user.firstName);
    setValue("lastName", user.lastName);
    setValue("phoneNumber", user.phoneNumber);
    setValue("address", user.address);
    setValue("gender", user.gender);
    setValue("positionId", user.positionId);
    setValue("roleId", user.roleId);
  };

  const handleDeleteUser = (user) => {
    dispatch(actions.fetchDeleteUser(user));
  };

  const renderFormInput = (
    fomatMessId,
    nameInput,
    type = "text",
    rules = {}
  ) => {
    return (
      <div className="mb-3 col-3">
        <label className="form-label">
          <FormattedMessage id={fomatMessId} />
        </label>
        <Controller
          name={nameInput}
          control={control}
          defaultValue=""
          // rules={rules}
          rules={
            nameInput === "password" ? {} : nameInput === "email" ? {} : rules
          } // Không áp dụng quy tắc nếu là trường password và chỉ đọc
          render={({ field, fieldState }) => (
            <>
              <input
                type={type}
                className={`form-control ${
                  fieldState.invalid ? "is-invalid" : ""
                }`}
                placeholder={`${intl.formatMessage({
                  id: "user-manage.enter",
                })} ${intl.formatMessage({ id: fomatMessId })}`}
                {...field}
                readOnly={
                  editingUser &&
                  (nameInput === "password" || nameInput === "email")
                    ? true
                    : false
                }
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
    );
  };

  return (
    <React.Fragment>
      <div className="container mt-30">
        <div className="title ">
          <h1 className="text-center">Create user redux</h1>
        </div>
        <form onSubmit={handleSubmit(handleSaveUser)}>
          <div className="row mt-5">
            <div className="row col-12">
              <p>Thêm mới người dùng</p>
            </div>
            {renderFormInput("user-manage.email", "email", "email", {
              required: "Email is required",
              pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
            })}
            {renderFormInput("user-manage.password", "password", "password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            {renderFormInput("user-manage.firstName", "firstName", "text", {
              required: "First name is required",
            })}
            {renderFormInput("user-manage.lastName", "lastName", "text", {
              required: "Last name is required",
            })}
            {renderFormInput(
              "user-manage.phoneNumber",
              "phoneNumber",
              "number",
              {
                required: "Number is required",
                minLength: {
                  value: 10,
                  message: "number must be at least 8 characters",
                },
              }
            )}
            {renderFormInput("user-manage.address", "address", "text", {
              required: "Adress is required",
            })}

            {dataReducer?.genders && (
              <div className="mb-3 col-3">
                <label className="form-label">
                  <FormattedMessage id="user-manage.gender" />
                </label>
                <Controller
                  name="gender"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Gender is required" }}
                  render={({ field }) => (
                    <>
                      <select
                        className={`form-select ${
                          errors.gender ? "is-invalid" : ""
                        }`}
                        {...field}
                      >
                        <option value="">
                          {intl.formatMessage({
                            id: "user-manage.selectGender",
                          })}
                        </option>
                        {dataReducer.genders.map((gender, index) => (
                          <option key={index} value={gender.keyMap}>
                            {dataReducer.language === "vi"
                              ? gender?.valueVn
                              : gender?.valueEn}
                          </option>
                        ))}
                      </select>
                      {errors.gender && (
                        <div className="invalid-feedback">
                          {errors.gender.message}
                        </div>
                      )}
                    </>
                  )}
                />
              </div>
            )}
            {dataReducer?.positions && (
              <div className="mb-3 col-3">
                <label className="form-label">
                  <FormattedMessage id="user-manage.position" />
                </label>
                <Controller
                  name="positionId"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Position is required" }}
                  render={({ field }) => (
                    <>
                      <select
                        className={`form-select ${
                          errors.positionId ? "is-invalid" : ""
                        }`}
                        {...field}
                      >
                        <option value="">
                          {intl.formatMessage({
                            id: "user-manage.selectPosition",
                          })}
                        </option>
                        {dataReducer.positions.map((position, index) => (
                          <option key={index} value={position.keyMap}>
                            {dataReducer.language === "vi"
                              ? position.valueVn
                              : position.valueEn}
                          </option>
                        ))}
                      </select>
                      {errors.position && (
                        <div className="invalid-feedback">
                          {errors.positionId.message}
                        </div>
                      )}
                    </>
                  )}
                />
              </div>
            )}

            {dataReducer?.roles && (
              <div className="mb-3 col-3">
                <label className="form-label">
                  <FormattedMessage id="user-manage.role" />
                </label>
                <Controller
                  name="roleId"
                  control={control}
                  defaultValue=""
                  rules={{ required: "Role is required" }}
                  render={({ field }) => (
                    <>
                      <select
                        className={`form-select ${
                          errors.roleId ? "is-invalid" : ""
                        }`}
                        {...field}
                      >
                        <option value="">
                          {intl.formatMessage({ id: "user-manage.selectRole" })}
                        </option>
                        {dataReducer.roles.map((role, index) => (
                          <option key={index} value={role.keyMap}>
                            {dataReducer.language === "vi"
                              ? role?.valueVn
                              : role?.valueEn}
                          </option>
                        ))}
                      </select>
                      {errors.roleId && (
                        <div className="invalid-feedback">
                          {errors.roleId.message}
                        </div>
                      )}
                    </>
                  )}
                />
              </div>
            )}
            <div className="mb-3 col-3">
              <label htmlFor="image" className="form-label">
                <FormattedMessage id="user-manage.image" />
              </label>
              <div className="preview-image-container">
                <input
                  type="file"
                  id="image"
                  name="image"
                  hidden
                  onChange={(e) => handleOnChangeImage(e)}
                />
                <label className="label-upload" htmlFor="image">
                  Tải ảnh <i className="fas fa-upload"></i>
                </label>
                <div
                  className="preview-image"
                  style={{ backgroundImage: `url(${imageUpload})` }}
                  onClick={() => openReviewImage()}
                ></div>
              </div>
            </div>
          </div>
          <div className="btn_save_user">
            <button type="submit" className="btn btn-primary">
              <FormattedMessage id="user-manage.save" />
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                reset();
                setImageUpload(null);
                setEditingUser(null);
              }}
            >
              <FormattedMessage id="user-manage.clear" />
            </button>
          </div>
        </form>
        {isOpen === true && (
          <Lightbox
            mainSrc={imageUpload}
            onCloseRequest={() => {
              setIsOpen(false);
            }}
          />
        )}
      </div>
      <TableManageUser
        allUser={dataReducer.allUser}
        handleDeleteUser={handleDeleteUser}
        handleUpdateUser={handleUpdateUser}
      />
      {/* 
      {console.log("allUser: ", Array.isArray(dataReducer.allUser))}
      <div>
        <UserAdmin items={dataReducer.allUser} page={4} />
      </div> */}
    </React.Fragment>
  );
}

export default UserRedux;

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./DoctorManage.scss";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils/constant";
import userService from "../../../services/userService";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";
import { find, set } from "lodash";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";

function DoctorManage() {
  const dispatch = useDispatch();
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const [selectDoctor, setSelectDoctor] = useState({});
  const [markdown, setMarkdown] = useState({
    contentMarkdown: "",
    contentHTML: "",
  });
  const [action, setAction] = useState({});
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();

  // call API nếu reducer chưa có list data doctors and dispatch get allcode doctor info
  useEffect(() => {
    if (!Object.keys(AllDoctors).length > 0) {
      dispatch(actions.fetchGetAllDoctors());
    }
    dispatch(actions.fetchRequiedDoctorInfo());
  }, []);

  /// Lay data all doctor từ store trong reducer
  const AllDoctors = useSelector((state) => {
    return state.doctor.AllDoctors.map((doctor) => {
      return {
        doctor: {
          ...doctor,
        },
        value: doctor.id,
        label: `${doctor.lastName} ${doctor.firstName} `,
      };
    });
  });

  // Lay language and saveInfoDoctor
  const { language } = useSelector((state) => {
    //console.log("---> State store:", state);
    return {
      language: state.app.language,
      saveInfoDoctor: state.doctor.saveInfoDoctor,
    };
  });

  const handleEditorChange = ({ html, text }) => {
    setMarkdown((pre) => ({
      ...pre,
      contentMarkdown: text,
      contentHTML: html,
    }));
  };

  const handleIntroWrite = (e, formName) => {
    let dataForm = e.target.value;
    setValue(formName, dataForm);
  };
  // setValue default
  const setDefaultValues = (label = null, value = null) => {
    console.log("label: ", label);
    console.log("value: ", value);
    let option = {};
    if (!label && !value) {
      option = null;
    } else {
      option = { label, value };
    }
    setValue("doctorId", option);
    setValue("description", "");
    setValue("nameClinic", "");
    setValue("addressClinic", "");
    setValue("paymentId", null);
    setValue("provinceId", null);
    setValue("priceId", null);
    setValue("note", "");
    setValue("specialtyId", null);
    setValue("clinicId", null);
    setMarkdown((pre) => ({
      contentHTML: "",
      contentMarkdown: "",
    }));
    setAction({
      action: "CREATE",
    });
  };
  const onSubmit = (data) => {
    // console.log("Form data submit: ", data);
    try {
      if (!markdown.contentHTML || !markdown.contentMarkdown) {
        toast.error("Trường markdown không được trống.");
        return;
      }
      const {
        addressClinic,
        clinicId,
        description,
        doctorId,
        nameClinic,
        note,
        paymentId,
        priceId,
        provinceId,
        specialtyId,
      } = data;
      const convertData = {
        addressClinic: addressClinic,
        clinicId: clinicId.value,
        doctorId: doctorId.value,
        addressClinic: addressClinic,
        paymentId: paymentId.value,
        priceId: priceId.value,
        provinceId: provinceId.value,
        specialtyId: specialtyId.value,
        nameClinic: nameClinic,
        note: note,
        description: description,
        ...markdown,
        ...action,
      };
      console.log("Action push data: ", convertData);
      setDefaultValues();
      dispatch(actions.fetchSaveInfoDoctor(convertData));
    } catch (error) {
      console.error(error.message);
    }
  };

  ///
  const builDataInputSelect = (inputData) => {
    // console.log("Input data: ", inputData);
    let result = [];
    let checkLang = language === LANGUAGES.VI;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        if (item.type === "PRICE") {
          const formatter1 = new Intl.NumberFormat(
            checkLang ? "vi-VN" : "en-US",
            {
              style: "currency",
              currency: checkLang ? "VND" : "USD",
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }
          );
          const formatter2 = new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          });
          const formatter3 = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          });

          object.label = formatter1.format(
            checkLang ? item.valueVn : item.valueEn
          );
          object.value = item.keyMap;
          object.type = item.type;
          object.valueVn = formatter2.format(item.valueVn);
          object.valueEn = formatter3.format(item.valueEn);
          result.push(object);
          return result;
        }
        object.label = checkLang ? `${item.valueVn} ` : `${item.valueEn}`;
        object.value = item.keyMap;
        object.type = item.type;
        object.valueVn = item.valueVn;
        object.valueEn = item.valueEn;
        result.push(object);
      });
    }
    return result;
  };
  useEffect(() => {
    let checkLang = language === LANGUAGES.VI;
    const fields = ["priceId", "provinceId", "paymentId"];

    fields.forEach((field) => {
      const currentValue = watch(field);
      // console.log(`current ${field} `, currentValue);

      if (currentValue) {
        setValue(field, {
          ...currentValue,
          label: checkLang ? currentValue.valueVn : currentValue.valueEn,
        });
      } else {
        // console.error(`Error: ${field} is undefined`);
        return;
      }
    });
  }, [language]);

  useEffect(() => {
    const { label, value, doctor } = selectDoctor;
    console.log("chọn bác sĩ: ", selectDoctor);
    if (
      doctor &&
      doctor.Markdown.doctorId !== null &&
      doctor.Doctor_Info.doctorId !== null
    ) {
      const findLabel = (dataKey, key) => {
        const item = dataKey.find((item) => item.value === key);
        return item
          ? language === LANGUAGES.VI
            ? item.valueVn
            : item.valueEn
          : "";
      };

      const labelPayment = findLabel(
        dataKeyPayment,
        doctor.Doctor_Info?.paymentId
      );
      const labelProvince = findLabel(
        dataKeyProvince,
        doctor.Doctor_Info?.provinceId
      );
      const labelPrice = findLabel(dataKeyPrice, doctor.Doctor_Info?.priceId);

      setValue("doctorId", { label, value });
      setValue("description", doctor.Markdown?.description || "");
      // setValue("editMarkdown", doctor.Markdown?.contentMarkdown || '');
      setValue("nameClinic", doctor.Doctor_Info?.nameClinic || "");
      setValue("addressClinic", doctor.Doctor_Info?.addressClinic || "");
      setValue("paymentId", {
        label: labelPayment,
        value: doctor.Doctor_Info?.paymentId,
      });
      setValue("provinceId", {
        label: labelProvince,
        value: doctor.Doctor_Info?.provinceId,
      });
      setValue("priceId", {
        label: labelPrice,
        value: doctor.Doctor_Info?.priceId,
      });
      setValue("note", doctor.Doctor_Info?.note || "");
      setValue("specialtyId", { label: "Cơ xương khớp", value: 1 });
      setValue("clinicId", {
        label: "Phòng khám đa khoa Hà Nội 1",
        value: "DK1",
      });
      setMarkdown((pre) => ({
        ...pre,
        contentHTML: doctor.Markdown?.contentHTML,
        contentMarkdown: doctor.Markdown?.contentMarkdown || "",
      }));
      setAction({
        action: "EDIT",
      });
    } else {
      console.log("create");
      setDefaultValues(label, value);
      setAction({ action: "CREATE" });
    }
  }, [selectDoctor, language]);

  //Lay data allCode info doctor từ store trong reducer
  const { dataKeyPayment, dataKeyPrice, dataKeyProvince } = useSelector(
    (state) => {
      console.log("state: ", state);
      const data = state.doctor.allKeysMapDoctorInfo;
      // console.log("data: ", data);
      const result = {};
      for (const key in data) {
        result[key] = builDataInputSelect(data[key]);
      }
      return result;
    }
  );
  return (
    <>
      <div className="container mt-5 mb-5">
        <div className="manage-doctor-title text-center">
          <h2>Tạo thêm thông tin Doctors</h2>
        </div>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-6 mt-4 form-item form-doctor">
              <label>
                <strong>Chọn bác sĩ:</strong>
              </label>
              <Controller
                name="doctorId"
                control={control}
                rules={{ required: "Trường này là bắt buộc" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      options={AllDoctors}
                      onChange={(option) => {
                        let { label, value } = option;
                        console.log("option value: ", option.value);
                        setValue("doctorId", { label, value });

                        setSelectDoctor(option);
                      }}
                      // value={field.value}
                      // value={field.value}
                    />
                    {errors.doctorId && (
                      <div
                        className="invalid-feedback "
                        // style={{ color: "red" }}
                      >
                        {errors.doctorId.message}
                      </div>
                    )}
                  </>
                )}
              />
            </div>
            <div className="col-6 mt-4 form-item form-descrition">
              <label>
                <strong>Mô tả:</strong>
              </label>
              <Controller
                name="description"
                control={control}
                rules={{ required: "Trường này là bắt buộc" }}
                render={({ field }) => (
                  <>
                    <textarea
                      className="form-control "
                      placeholder="Description..."
                      style={{ height: "150px" }}
                      onChange={(e) => {
                        field.onChange(e);
                        handleIntroWrite(e, "description");
                      }}
                      value={field.value}
                    />
                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description.message}
                      </div>
                    )}
                  </>
                )}
              />
            </div>
            <div className="col-4 mt-4 form-item form-price">
              <label>
                <strong>Chọn giá:</strong>
              </label>
              <Controller
                name="priceId"
                control={control}
                rules={{ required: "Trường này là bắt buộc" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      options={dataKeyPrice}
                      onClick={(option) => {
                        setValue("priceId", option.value);
                      }}
                      value={field.value || ""}
                    />
                    {errors.priceId && (
                      <div className="invalid-feedback">
                        {errors.priceId.message}
                      </div>
                    )}
                  </>
                )}
              />
            </div>
            <div className="col-4 mt-4 form-item form-payment">
              <label>
                <strong>Chọn phương thức thanh toán:</strong>
              </label>
              <Controller
                name="paymentId"
                control={control}
                rules={{ required: "Trường này là bắt buộc" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      options={dataKeyPayment}
                      onClick={(option) => {
                        setValue("paymentId", option.value); // Set value for the "priceId" field
                      }}
                      // value={selectedOption}
                    />
                    {errors.paymentId && (
                      <div className="invalid-feedback">
                        {errors.paymentId.message}
                      </div>
                    )}
                  </>
                )}
              />
            </div>
            <div className="col-4 mt-4 form-item form-provinceId">
              <label>
                <strong>Chọn tỉnh thành:</strong>
              </label>
              <Controller
                name="provinceId"
                control={control}
                rules={{ required: "Trường này là bắt buộc" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      options={dataKeyProvince}
                      onClick={(option) => {
                        setValue("addressClinic", option.value); // Set value for the "priceId" field
                      }}
                      // value={selectedOption}
                    />
                    {errors.provinceId && (
                      <div className="invalid-feedback">
                        {errors.provinceId.message}
                      </div>
                    )}
                  </>
                )}
              />
            </div>
            <div className="col-4 mt-4 form-item form-nam-clinic">
              <label>
                <strong>Tên phòng khám:</strong>
              </label>
              <Controller
                name="nameClinic"
                control={control}
                rules={{ required: "Trường này là bắt buộc" }}
                render={({ field }) => (
                  <>
                    <textarea
                      className="form-control "
                      placeholder="nameClinic..."
                      onChange={(e) => {
                        field.onChange(e);
                        handleIntroWrite(e, "nameClinic");
                      }}
                      value={field.value}
                    />
                    {errors.nameClinic && (
                      <div className="invalid-feedback">
                        {errors.nameClinic.message}
                      </div>
                    )}
                  </>
                )}
              />
            </div>
            <div className="col-4 mt-4 form-item form-address-clinic">
              <label>
                <strong>Địa chỉ phòng khám:</strong>
              </label>
              <Controller
                name="addressClinic"
                control={control}
                rules={{ required: "Trường này là bắt buộc" }}
                render={({ field }) => (
                  <>
                    <textarea
                      className="form-control "
                      placeholder="Description..."
                      onChange={(e) => {
                        field.onChange(e);
                        handleIntroWrite(e, "addressClinic");
                      }}
                      value={field.value}
                    />
                    {errors.addressClinic && (
                      <div className="invalid-feedback">
                        {errors.addressClinic.message}
                      </div>
                    )}
                  </>
                )}
              />
            </div>
            <div className="col-4 mt-4 form-item form-note">
              <label>
                <strong>Note:</strong>
              </label>
              <Controller
                name="note"
                control={control}
                rules={{ required: "Trường này là bắt buộc" }}
                render={({ field }) => (
                  <>
                    <textarea
                      className="form-control "
                      placeholder="Note..."
                      onChange={(e) => {
                        field.onChange(e);
                        handleIntroWrite(e, "note");
                      }}
                      value={field.value || ""}
                    />
                    {errors.note && (
                      <div className="invalid-feedback">
                        {errors.note.message}
                      </div>
                    )}
                  </>
                )}
              />
            </div>
            <div className="col-4 mt-4 form-item form-select-specialty">
              <label>
                <strong>Chọn chuyên khoa:</strong>
              </label>
              <Controller
                name="specialtyId"
                control={control}
                rules={{ required: "Trường này là bắt buộc" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      options={[
                        { label: "Cơ xương khớp", value: 1 },
                        { label: "Thai nhi", value: 2 },
                        { label: "Tai mũi họng", value: 3 },
                        { label: "Thần kinh", value: 4 },
                      ]}
                      onClick={(option) => {
                        setValue("specialtyId", option.value); // Set value for the "priceId" field
                      }}
                    />
                    {errors.specialtyId && (
                      <div className="invalid-feedback">
                        {errors.specialtyId.message}
                      </div>
                    )}
                  </>
                )}
              />
            </div>

            <div className="col-4 mt-4 form-item form-select-clinic">
              <label>
                <strong>Chọn phòng khám:</strong>
              </label>
              <Controller
                name="clinicId"
                control={control}
                rules={{ required: "Trường này là bắt buộc" }}
                render={({ field }) => (
                  <>
                    <Select
                      {...field}
                      options={[
                        { label: "Đa khoa Hà nội 1", value: "DK1" },
                        { label: "Đa khoa Hà nội 2", value: "DK2" },
                        { label: "Đa khoa Hà nội 3", value: "DK3" },
                      ]}
                      onClick={(option) => {
                        setValue("clinicId", option.value); // Set value for the "priceId" field
                      }}
                      value={field.value}
                    />
                    {errors.clinicId && (
                      <div className="invalid-feedback">
                        {errors.clinicId.message}
                      </div>
                    )}
                  </>
                )}
              />
            </div>
            <div className="col-12 mt-4">
              <MdEditor
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={(event) => {
                  handleEditorChange(event);
                }}
                value={markdown.contentMarkdown}
              />
            </div>
            <div className="save-content-doctor">
              <button className="btn btn-primary" type="submit">
                {action && action.action === "CREATE"
                  ? "Tạo thông tin"
                  : "Chỉnh sửa"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
export default DoctorManage;

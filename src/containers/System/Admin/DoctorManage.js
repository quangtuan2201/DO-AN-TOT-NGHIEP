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
import { find } from "lodash";
import { toast } from "react-toastify";

function DoctorSelect({ options, onChange, value }) {
  return <Select options={options} onChange={onChange} value={value} />;
}
function TextAreaInput({ label, placeholder, onChange, value }) {
  return (
    <div className="col-4 mt-4">
      <label>
        <strong>{label}:</strong>
      </label>
      <textarea
        className="form-control"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
function DoctorManage() {
  ////console.log("--------------------------");
  ////console.log("re-render");
  ////console.log("--------------------------");

  const dispatch = useDispatch();
  const [selectDoctor, setSelectOption] = useState({});
  const mdParser = new MarkdownIt(/* Markdown-it options */);
  const [contentDes, setContentDes] = useState("");
  // save to toctor_info table
  const [selectedPayment, setSelectedPayment] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [writeNameClinic, setWriteNameClinic] = useState("");
  const [addressClinic, setAddressClinic] = useState("");
  const [writeNote, setWriteNote] = useState("");
  const [allRrequiedDoctorInfo, setAllRrequiedDoctorInfo] = useState([]);
  const [markdown, setMarkdown] = useState("");
  const [contentInfoDoctor, setContentInfoDoctor] = useState(null);
  //console.log("----------re-render-----------");
  //console.log("|||||||||||||||||||||||||||||||");
  ////console.log("Content submit: ", contentInfoDoctor);
  ////console.log("|||||||||||||||||||||||||||||||");

  // call API nếu reducer chưa có list data doctors
  useEffect(() => {
    if (!Object.keys(AllDoctors).length > 0)
      dispatch(actions.fetchGetAllDoctors());
  }, []);

  /// Lay data all doctor từ store trong reducer
  const AllDoctors = useSelector((state) => {
    return state.doctor.AllDoctors.map((doctor) => {
      // ////console.log("All Doctor reduc store: ", state.doctor.AllDoctors);
      return {
        ...doctor,
        value: doctor.id,
        label: `${doctor.lastName} ${doctor.firstName} `,
      };
    });
  });

  // Lay language and saveInfoDoctor
  const { language, saveInfoDoctor } = useSelector((state) => {
    ////console.log("---> State store:", state);
    return {
      language: state.app.language,
      saveInfoDoctor: state.doctor.saveInfoDoctor,
    };
  });
  //dispatch get allcode doctor info
  useEffect(() => {
    dispatch(actions.fetchRequiedDoctorInfo());
  }, [language]);

  const handleEditorChange = ({ html, text }) => {
    // setMarkdown({
    //   contentMarkdown: text,
    //   contentHTML: html,
    // });
    setContentInfoDoctor((pre) => ({
      ...pre,
      contentMarkdown: text,
      contentHTML: html,
    }));
  };

  //ham xu lý khi viết description doctor
  const handleIntroWrite = (e, formName) => {
    let dataForm = e.target.value;
    switch (formName) {
      case "description":
        // setContentDes(dataForm)
        return setContentInfoDoctor((pre) => ({
          ...pre,
          description: dataForm,
        }));
      case "note":
        return setContentInfoDoctor((pre) => ({
          ...pre,
          note: dataForm,
        }));
      case "addressClinic":
        return setContentInfoDoctor((pre) => ({
          ...pre,
          addressClinic: dataForm,
        })); // Corrected this line
      case "nameClinic":
        ////console.log("Name Clinic: ", dataForm);
        return setContentInfoDoctor((pre) => ({
          ...pre,
          nameClinic: dataForm,
        }));
      default:
      ////console.error("Error writing text area...");
    }
  };

  //Hàm xử lý lưu thông tin create or update
  const handleSaveInfo = () => {
    if (!selectDoctor || !selectDoctor.id) {
      console.error("Invalid selectDoctor");
      toast.error("Chosee requied Doctor !");
      return;
    }
    console.log("contentInfoDoctor : ", contentInfoDoctor);
    const {
      priceId,
      paymentId,
      provinceId,
      nameClinic,
      addressClinic,
      contentMarkdown,
      description,
    } = contentInfoDoctor;
    if (
      !addressClinic ||
      !contentMarkdown ||
      !description ||
      !nameClinic ||
      !paymentId ||
      !priceId ||
      !provinceId
    ) {
      console.log(
        "!addressClinic:",
        addressClinic,
        "contentMarkdown:",
        "!contentMarkdown:",
        contentMarkdown,
        "!description",
        description,
        "!nameClinic",
        nameClinic,
        "!paymentId",
        paymentId,
        "!priceId",
        priceId,
        "!provinceId",
        provinceId
      );
      toast.error("Không được để các trường này trống !");
      console.error("Không được để các trường này trống");
      return;
    }
    dispatch(actions.fetchSaveInfoDoctor(contentInfoDoctor));

    console.log("====>>> Content Info Doctor =>>> :", contentInfoDoctor);
    setContentInfoDoctor({
      contentMarkdown: "",
      contentHTML: "",
      doctorId: 0,
      description: "",
      paymentId: "",
      provinceId: "",
      priceId: "",
      addressClinic: "",
      contentHTML: "",
      contentMarkdown: "",
      description: "",
      nameClinic: "",
      note: "",
      count: "",
    });
    setSelectOption({});
  };

  // Hàm xử lý chọn bác sĩ
  const handlSelectDoctor = (selectDoctor) => {
    console.log("==> Chọn bác sĩ hiện tại: ", selectDoctor);
    console.log("==> Thông tin lưu trên redux: ", saveInfoDoctor);
    setSelectOption(selectDoctor);
    setContentInfoDoctor((pre) => {
      if (
        Object.keys(saveInfoDoctor).length !== 0 &&
        saveInfoDoctor.doctorId === selectDoctor.id
      ) {
        console.log("dk1");

        return {
          ...pre,
          // id: saveInfoDoctor.id,
          doctorId: saveInfoDoctor.doctorId,
          paymentId: saveInfoDoctor.paymentId,
          provinceId: saveInfoDoctor.provinceId,
          priceId: saveInfoDoctor.priceId,
          addressClinic: saveInfoDoctor.addressClinic,
          contentHTML: saveInfoDoctor.contentHTML,
          contentMarkdown: saveInfoDoctor.contentMarkdown,
          description: saveInfoDoctor.description,
          nameClinic: saveInfoDoctor.nameClinic,
          note: saveInfoDoctor.note,
          count: saveInfoDoctor?.count,
          action: CRUD_ACTIONS.EDIT,
        };
      } else if (
        !selectDoctor.Doctor_Info.paymentId ||
        !selectDoctor.Markdown.contentMarkdown
      ) {
        console.log("dk3");
        console.log("dk3");
        return {
          ...pre,
          doctorId: selectDoctor?.id,
          action: CRUD_ACTIONS.CREATE,
          contentMarkdown: "",
          description: "",
          priceId: "",
          paymentIdL: "",
          provinceId: "",
        };
      } else {
        console.log("dk2");
        return {
          ...pre,
          doctorId: selectDoctor?.id,
          paymentId: selectDoctor?.Doctor_Info?.paymentId,
          provinceId: selectDoctor?.Doctor_Info?.provinceId,
          priceId: selectDoctor?.Doctor_Info?.priceId,
          addressClinic: selectDoctor?.Doctor_Info?.addressClinic,
          contentHTML: selectDoctor?.Markdown?.contentHTML,
          contentMarkdown: selectDoctor?.Markdown?.contentMarkdown,
          description: selectDoctor?.Markdown?.description,
          nameClinic: selectDoctor?.Doctor_Info?.nameClinic,
          note: selectDoctor?.Doctor_Info?.note,
          count: selectDoctor?.Doctor_Info?.count,
          action: CRUD_ACTIONS.EDIT,
        };
      }
    });
  };
  //render form input
  const DoctorFormInput = ({
    label,
    options,
    onChange,
    value,
    placeholder,
  }) => {
    return (
      <div className="col-4 mt-4">
        <label>
          <strong>{label}</strong>
        </label>
        <DoctorSelect options={options} onChange={onChange} value={value} />
      </div>
    );
  };
  // buil data input select
  const builDataInputSelect = (inputData) => {
    ////console.log("Input data: ", inputData);
    let result = [];
    let checkLang = language === LANGUAGES.VI;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        // ////console.log("item:", index, "====>", item);
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
    ////console.log("Result conert Key: ", result);
    ////console.log("list key :", listkeyInfoDoctor);
    return result;
  };
  //Lay data allCode info doctor từ store trong reducer
  const { dataKeyPayment, dataKeyPrice, dataKeyProvince } = useSelector(
    (state) => {
      const data = state.doctor.allKeysMapDoctorInfo;
      const result = {};
      for (const key in data) {
        result[key] = builDataInputSelect(data[key]);
      }
      // ////console.log("result: ", result);
      // setListKeyInfoDoctor(result);
      return result;
    }
  );
  // handleOnChangeInfoDoctor
  const handleOnChangeInfoDoctor = (selectDoctoInfo) => {
    // setSelectedPrice(selectDoctoInfo);
    //console.log("selectDoctoInfo", selectDoctoInfo);
    const checkType = selectDoctoInfo.type;
    switch (checkType) {
      case "PRICE":
        ////console.log("CASE PRICE");
        setSelectedPrice(selectDoctoInfo);
        return setContentInfoDoctor((pre) => ({
          ...pre,
          priceId: selectDoctoInfo.value,
        }));
      case "PROVINCE":
        ////console.log("PROVINCE");
        //setSelectedProvince(selectDoctoInfo)
        return setContentInfoDoctor((pre) => ({
          ...pre,
          provinceId: selectDoctoInfo.value,
        }));
      case "PAYMENT":
        //setSelectedPayment(selectDoctoInfo)
        return setContentInfoDoctor((pre) => ({
          ...pre,
          paymentId: selectDoctoInfo.value,
        }));
      case "DEFAULT":
        ////console.log("DEFAAULT");
        let checkLang = language === LANGUAGES.VI;
        [setSelectedPrice, setSelectedProvince, setSelectedPayment].forEach(
          (setSelected) => {
            setSelected((pre) => {
              const labelKey = checkLang ? "valueVn" : "valueEn";
              ////console.log("pre curent: ", pre[labelKey]);
              return {
                ...pre,
                label: pre[labelKey],
              };
            });
          }
        );

        break;
      default:
      ////console.log("Unknown type");
    }
  };
  useEffect(() => {
    handleOnChangeInfoDoctor({ type: "DEFAULT" });
  }, [language]);

  const findValuekey = (key, listKeys) => {
    ////console.log("key: ", key);
    ////console.log("list key: ", listKeys);
    if (!Array.isArray(listKeys) || !listKeys > 0) {
      return;
    }
    let result = listKeys.find((item) => {
      return item.value === key;
    });
    ////console.log("====> fint item sucess : ", result);
    return result;
  };
  console.log("contentInfoDoctor: ", contentInfoDoctor);
  // return
  return (
    <>
      <div className="doctor-container">
        <div className="manage-doctor-title text-center">
          Tạo thêm thông tin Doctors
        </div>

        <div className="container">
          <div className=" doctor-form row">
            <div className="col-5 ">
              <label>
                <strong>Chọn Bác sĩ:</strong>
              </label>
              <DoctorSelect
                options={AllDoctors}
                onChange={handlSelectDoctor}
                value={selectDoctor}
              />
            </div>
            <div className="col-6 doctor-textarea-right">
              <label>
                <strong>Thông tin giới thiệu: </strong>
              </label>
              <textarea
                className="form-control "
                placeholder="Description..."
                onChange={(e) => {
                  handleIntroWrite(e, "description");
                }}
                value={contentInfoDoctor?.description}
              />
            </div>
            <DoctorFormInput
              label="Chọn giá:"
              options={dataKeyPrice}
              onChange={handleOnChangeInfoDoctor}
              value={findValuekey(contentInfoDoctor?.priceId, dataKeyPrice)}
            />
            <DoctorFormInput
              label="Chọn phương thức thanh toán"
              options={dataKeyPayment}
              onChange={handleOnChangeInfoDoctor}
              value={findValuekey(contentInfoDoctor?.paymentId, dataKeyPayment)}
            />
            <DoctorFormInput
              label="Chọn tỉnh thành:"
              options={dataKeyProvince}
              onChange={handleOnChangeInfoDoctor}
              value={findValuekey(
                contentInfoDoctor?.provinceId,
                dataKeyProvince
              )}
            />
            <div className="col-4  mt-4">
              <label>
                <strong>Tên phòng khám: </strong>
              </label>
              <textarea
                className="form-control "
                placeholder="Clinic name..."
                onChange={(e) => {
                  handleIntroWrite(e, "nameClinic");
                }}
                value={contentInfoDoctor?.nameClinic}
              />
            </div>
            <div className="col-4  mt-4">
              <label>
                <strong>Địa chỉ phòng khám: </strong>
              </label>
              <textarea
                className="form-control "
                placeholder="Adress clinic..."
                onChange={(e) => {
                  handleIntroWrite(e, "addressClinic");
                }}
                value={contentInfoDoctor?.addressClinic}
              />
            </div>
            <div className="col-4  mt-4">
              <label>
                <strong>Note: </strong>
              </label>
              <textarea
                className="form-control "
                placeholder="Note..."
                onChange={(e) => {
                  handleIntroWrite(e, "note");
                }}
                value={contentInfoDoctor?.note}
              />
            </div>
          </div>
        </div>

        <div className="col-12">
          <h3 style={{ color: "blue", margin: " 20px 0" }}></h3>
          <hr />
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            value={contentInfoDoctor?.contentMarkdown}
          />
        </div>
        <div className="save-content-doctor">
          <button
            type="button"
            className={`btn btn-warning 1`}
            disabled={
              !contentInfoDoctor?.doctorId ||
              !contentInfoDoctor?.contentMarkdown ||
              !contentInfoDoctor?.priceId ||
              !contentInfoDoctor?.paymentId ||
              !contentInfoDoctor?.provinceId
            }
            onClick={handleSaveInfo}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
}
export default DoctorManage;

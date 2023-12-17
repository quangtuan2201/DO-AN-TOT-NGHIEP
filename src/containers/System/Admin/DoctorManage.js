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

function DoctorSelect({ options, onChange, value }) {
  return <Select options={options} onChange={onChange} value={value} />;
}

function DoctorManage() {
  const dispatch = useDispatch();
  const [isContentEdited, setIsContentEdited] = useState(false);
  const [selectDoctor, setSelectOption] = useState({});
  const [options, setOptions] = useState(null);
  const mdParser = new MarkdownIt(/* Markdown-it options */);

  // save to toctor_info table
  const [listPrice, setListPrice] = useState([]);
  const [listPayment, setListPayment] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([]);
  const [selectProvince, setSelectProvince] = useState([]);
  const [nameclinic, setNameClinic] = useState([]);
  const [addressClinic, setAddressClinic] = useState([]);
  const [note, setNode] = useState("");
  const [infoDoctor, setInfoDoctor] = useState([]);
  const [allRrequiedDoctorInfo, setAllRrequiedDoctorInfo] = useState([]);

  const [content, setContent] = useState({
    contentHTML: "",
    contentMarkdown: "",
    description: "",
    doctorId: 0,
  });
  //dispatch get allcode doctor info
  useEffect(() => {
    dispatch(actions.fetchRequiedDoctorInfo());
  }, []);

  const allDoctors = useSelector((state) => {
    return state.admin.allDoctors.map((doctor) => {
      return {
        ...doctor,
        value: doctor.id,
        label: `${doctor.lastName} ${doctor.firstName} `,
      };
    });
  });
  // const { dataKeyPayment, dataKeyPrice, dataKeyProvince } = useSelector(
  //   (state) => {
  //     const data = state.doctor.allDoctorInfo;
  //     data.keys.map((item) => {
  //       return {
  //         value: item.keyMap,
  //         // label: language ===LANGUAGES.VI==="",
  //       };
  //     });
  //     return data;
  //   }
  // );
  // console.log("--------------dataKeyPrice: ", dataKeyPrice);
  const { language, saveInfoDoctor } = useSelector((state) => {
    return {
      language: state.app.language,
      saveInfoDoctor: state.admin.saveInfoDoctor,
    };
  });

  useEffect(() => {
    if (!Object.keys(allDoctors).length) dispatch(actions.fetchGetAllDoctors());
  }, []);

  // console.log("Content: ", content);
  // console.log("Select doctor: ", selectDoctor);
  const handleEditorChange = ({ html, text }) => {
    // console.log("--Content change:", html, ",", text);
    setContent((present) => {
      return {
        ...present,
        contentMarkdown: text,
        contentHTML: html,
      };
    });
  };
  const handleIntroWrite = (e) => {
    // console.log(e.target.value);
    let description = e.target.value;
    setContent((present) => {
      return {
        ...present,
        description,
      };
    });
  };
  const handleSaveInfo = () => {
    try {
      // console.log("---Action save infor : ", content);
      dispatch(actions.fetchSaveInfoDoctor(content));
      setContent({
        contentMarkdown: "",
        contentHTML: "",
        doctorId: 0,
        description: "",
      });
      setSelectOption({});
    } catch (error) {
      console.error("Call API fail: ", error.message);
    }
  };

  const handlSelectDoctor = (selectDoctor) => {
    // console.log("Current Select Doctor: ", selectDoctor);
    setSelectOption(selectDoctor);

    setContent((present) => {
      if (selectDoctor.Markdown) {
        console.log(
          "Check dieu kien: ,data !== ) && idNew === idCurent",
          Object.keys(saveInfoDoctor).length !== 0 &&
            saveInfoDoctor.doctorId === selectDoctor.id
        );
        if (
          Object.keys(saveInfoDoctor).length !== 0 &&
          saveInfoDoctor.doctorId === selectDoctor.id
        ) {
          alert("Update");
          return {
            ...present,
            doctorId: saveInfoDoctor.doctorId,
            contentMarkdown: saveInfoDoctor?.contentMarkdown,
            contentHTML: saveInfoDoctor.contentHTML,
            description: saveInfoDoctor?.description,
            action: CRUD_ACTIONS.EDIT,
          };
        }

        return {
          ...present,
          doctorId: selectDoctor.value,
          contentMarkdown: selectDoctor.Markdown?.contentMarkdown,
          contentHTML: selectDoctor?.Markdown?.contentHTML,
          description: selectDoctor?.Markdown?.description,
          action: CRUD_ACTIONS.EDIT,
        };
      } else {
        return {
          ...present,
          doctorId: selectDoctor.value,
          contentMarkdown: "",
          description: "",
          action: CRUD_ACTIONS.CREATE,
        };
      }
    });
  };
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
                options={allDoctors}
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
                onChange={handleIntroWrite}
                // value={content?.description ? content?.description : ""}
                value={content?.description}
              ></textarea>
            </div>
            <DoctorFormInput label="Chọn giá:" options={[]} />
            <DoctorFormInput label="Chọn phương thức thanh toán" options={[]} />
            <DoctorFormInput label="Chọn tỉnh thành:" options={[]} />
            <DoctorFormInput label="Tên phòng khám:" options={[]} />
            <DoctorFormInput label="Địa chỉ phòng khám:" options={[]} />
            <DoctorFormInput label="Note:" options={[]} />
          </div>
        </div>

        <div className="col-12">
          <h3 style={{ color: "blue", margin: " 20px 0" }}></h3>
          <hr />
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            value={content?.contentMarkdown}
          />
        </div>
        <div className="save-content-doctor">
          <button
            type="button"
            className={`btn btn-warning ${
              content && content?.action === "CREATE" ? "btn-c" : "btn-e"
            } `}
            disabled={!content?.doctorId || !content?.contentMarkdown}
            onClick={handleSaveInfo}
          >
            {content && content?.action === "CREATE" ? "CREATE" : "EDIT"}
          </button>
        </div>
      </div>
    </>
  );
}
export default DoctorManage;

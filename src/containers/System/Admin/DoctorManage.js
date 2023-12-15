import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./DoctorManage.scss";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS } from "../../../utils/constant";

function DoctorSelect({ options, onChange, value }) {
  return <Select options={options} onChange={onChange} value={value} />;
}

function DoctorManage() {
  const dispatch = useDispatch();
  const [isContentEdited, setIsContentEdited] = useState(false);
  const [selectDoctor, setSelectOption] = useState({});
  const [options, setOptions] = useState(null);
  const [content, setContent] = useState({
    contentHTML: "",
    contentMarkdown: "",
    description: "",
    doctorId: 0,
  });
  const allDoctors = useSelector((state) => {
    console.log("state in DoctorMange: ", state);
    // let data = state.admin.allDoctors;
    // console.log(data);
    return state.admin.allDoctors.map((doctor) => {
      return {
        ...doctor,
        value: doctor.id,
        label: `${doctor.lastName} ${doctor.firstName} `,
      };
    });
  });
  const saveInfoDoctor = useSelector((state) => {
    console.warn("SAVEINFO DOCTOR:", state.admin.saveInfoDoctor);
    return state.admin.saveInfoDoctor;
  });
  useEffect(() => {
    if (!Object.keys(allDoctors).length) dispatch(actions.fetchGetAllDoctors());
  }, []);

  const mdParser = new MarkdownIt(/* Markdown-it options */);
  console.log("Content: ", content);
  // console.log("Select doctor: ", selectDoctor);
  const handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange:/n", html, ",", text);
    console.log("handleEditchange: ", content);
    setContent((present) => {
      return {
        ...present,
        contentMarkdown: text,
        contentHTML: html,
      };
    });
  };
  const handleIntroWrite = (e) => {
    console.log(e.target.value);
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
    console.log("selectDoctor: ", selectDoctor);
    setSelectOption(selectDoctor);

    setContent((present) => {
      if (selectDoctor.Markdown) {
        if (
          Object.keys(saveInfoDoctor).length !== 0 &&
          saveInfoDoctor.doctorId === selectDoctor.doctorId
        ) {
          console.log("TRUE!");
          return {
            ...present,
            doctorId: saveInfoDoctor.doctorId,
            contentMarkdown: saveInfoDoctor?.contentMarkdown,
            // contentMarkdown: saveInfoDoctor?.contentMarkdown,
            description: saveInfoDoctor?.description,
            action: CRUD_ACTIONS.EDIT,
          };
        }
        return {
          ...present,
          doctorId: selectDoctor.value,
          contentMarkdown: selectDoctor.Markdown?.contentMarkdown,
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

  return (
    <>
      <div className="doctor-container">
        <div className="manage-doctor-title text-center">
          Tạo thêm thông tin Doctors
        </div>
        <div className="doctor-form">
          <div className="col-4 doctor-select-left">
            <label>
              <strong>Chọn Bác sĩ:</strong>
            </label>
            <DoctorSelect
              options={allDoctors}
              onChange={handlSelectDoctor}
              value={selectDoctor}
            />
          </div>
          <div className="col-8 doctor-textarea-right">
            <label>
              <strong>Thông tin giới thiệu: </strong>
            </label>
            <textarea
              className="form-control"
              placeholder="Description..."
              onChange={handleIntroWrite}
              // value={content?.description ? content?.description : ""}
              value={content?.description}
            ></textarea>
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
            // value={content?.contentMarkdown}
          />
        </div>
        <div className="save-content-doctor">
          <button
            type="button"
            className={`btn btn-warning ${
              content && content?.action === "CREATE" ? "btn-c" : "btn-e"
            } `}
            disabled={!content?.doctorId || !content?.contentMarkdown}
            // {!content?.doctorId || !content?.contentMarkdown}
            onClick={handleSaveInfo}
          >
            {/* {!content?.doctorId || !content?.contentMarkdown
              ? "Create"
              : "Update"} */}
            {content && content?.action === "CREATE" ? "CREATE" : "EDIT"}
          </button>
        </div>
      </div>
    </>
  );
}
export default DoctorManage;

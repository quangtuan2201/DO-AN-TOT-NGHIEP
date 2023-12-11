import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./DoctorManage.scss";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../store/actions";
import doctorService from "../../../services/doctorService";
// const options = [
//   { value: 1, label: "Tuấn Anh", position: "P1" },
//   { value: 2, label: "Ngọc Anh", position: "P2" },
//   { value: 3, label: "Ngọc Tú", position: "P4" },
//   { value: 4, label: "Tuấn Hà", position: "P3" },
//   { value: 5, label: "Anh Thư", position: "P3" },
//   { value: 6, label: "Vân Nguyễn", position: "P3" },
//   { value: 7, label: "Tuấn Anh", position: "P3" },
//   { value: 8, label: "Ngọc Anh", position: "P3" },
//   { value: 9, label: "Ngọc Tú", position: "P3" },
//   { value: 10, label: "Tuấn Anh", position: "P3" },
// ];

function DoctorSelect({ options, onChange, value }) {
  return <Select options={options} onChange={onChange} value={value} />;
}

function DoctorManage() {
  const dispatch = useDispatch();
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
  console.log("CHECK option", options);
  useEffect(() => {
    dispatch(actions.fetchGetAllDoctors());
  }, []);
  // useEffect(() => {
  //     console.log("Check doctor: ", allDoctors);
  //     const doctors = allDoctors?.map((doctor) => ({
  //       ...doctor,
  //       value: doctor.id,
  //       label: `${doctor.lastName} ${doctor.firstName} `,
  //     }));
  //     console.log("DOCTORS... : ", doctors);
  //     setOptions(doctors);
  // }, []);

  const mdParser = new MarkdownIt(/* Markdown-it options */);
  console.log("Content: ", content);
  const handleEditorChange = ({ html, text }) => {
    console.log("handleEditorChange:/n", html, ",", text);
    setContent({
      contentMarkdown: text,
      contentHTML: html,
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
      console.log("content in fuc handlSave: ", content);
      dispatch(actions.fetchSaveInfoDoctor(content));
    } catch (error) {
      console.error("Call API fail: ", error.message);
    }
  };

  const handlSelectDoctor = (selectDoctor) => {
    console.log("selectDoctor: ", selectDoctor);
    setSelectOption(selectDoctor);
    setContent((present) => {
      return {
        ...present,
        doctorId: selectDoctor.value,
      };
    });
  };

  return (
    <>
      <div className="container doctor-container">
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
          />
        </div>
        <div className="save-content-doctor">
          <button
            type="button"
            class="btn btn-warning"
            disabled={
              !content?.doctorId ||
              !content?.contentMarkdown ||
              !content?.contentHTML
            }
            onClick={handleSaveInfo}
          >
            Lưu thông tin
          </button>
        </div>
      </div>
    </>
  );
}
export default DoctorManage;

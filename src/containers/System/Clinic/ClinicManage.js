import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonUtils from "../../../utils/CommonUtils";
import * as actions from "../../../store/actions";
import "./ClinicManage.scss";
import clinicService from "../../../services/clinicService";
import { toast } from "react-toastify";

function ClinicManage() {
  const mdParser = new MarkdownIt();
  const dispatch = useDispatch();
  const [content, setContent] = useState({
    image: "",
    imageBase64: "",
    descriptionMarkdown: "",
    descriptionHTML: "",
  });
  const [desMarkdown, setDesMarkdown] = useState({
    descriptionMarkdown: "",
    descriptionHTML: "",
  });

  const [inputClinic, setInputClinic] = useState({
    address: "",
    name: "",
  });
  const [avatar, setAvatar] = useState({
    imageBase64: "",
  });
  //get language
  const { language } = useSelector((state) => {
    return {
      language: state.app.language,
    };
  });

  // handle wirte description content
  const handleEditorChange = ({ html, text }) => {
    setDesMarkdown((pre) => ({
      ...pre,
      descriptionMarkdown: text,
      descriptionHTML: html,
    }));
  };

  //handle change select spcialty
  const handlOnChangeClinic = (e, nameInput) => {
    const dataInput = e.target.value;
    if (nameInput === "nameClinic") {
      setInputClinic((pre) => ({
        ...pre,
        name: dataInput,
      }));
    } else if (nameInput === "addressClinic") {
      setInputClinic((pre) => ({
        ...pre,
        address: dataInput,
      }));
    }
  };
  //handle change avatar
  const handlOnChangeAvatar = async (event) => {
    const file = event.target.files;
    if (file && file[0]) {
      let base64 = await CommonUtils.getBase64(file[0]);
      setAvatar((pre) => ({
        ...pre,
        imageBase64: base64,
      }));
    }
  };

  // handle submit data
  const handleSubmit = async () => {
    try {
      const formData = {
        ...inputClinic,
        ...avatar,
        ...desMarkdown,
      };
      if (
        !formData.name ||
        !formData.descriptionHTML ||
        !formData.descriptionMarkdown ||
        !formData.imageBase64
      ) {
        toast.error("Các trường dữ liệu không được để trống !");
        return;
      }
      const response = await clinicService.handleSaveInfoClinic(formData);
      if (response) {
        toast.success("Tạo chuyên khoa thành công.");
      } else {
        toast.error("Tạo chuyên khoa thất bại");
      }
      setAvatar(() => {
        return { imageBase64: "" };
      });
      setInputClinic({
        name: "",
        address: "",
      });
      setDesMarkdown({
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } catch (error) {
      console.error("Fetch create specialty fail.");
    }
  };
  return (
    <>
      <div className=" manage-clinic-container ml-5 mr-5">
        <h2 className="text-center mt-4 ms-title title ">Quản lý phòng khám</h2>
        <div className="row d-flex justify-content-between align-items-center add-new-clinic ">
          {/* <div className="col-5 form-group clinic-chosse ">
            <label>
              <strong>Tên phòng khám:</strong>
            </label>

            <input
              value={inputClinic.name}
              className="form-control"
              onChange={(e) => {
                handlOnChangeClinic(e, "nameClinic");
              }}
              placeholder="Điền tên phòng khám"
            />
          </div> */}
          <div class=" col-5 form-group clinic-chosse ">
            <label>
              <strong>Tên phòng khám:</strong>
            </label>
            <textarea
              value={inputClinic.name}
              onChange={(e) => {
                handlOnChangeClinic(e, "nameClinic");
              }}
              placeholder="Điền tên phòng khám"
              class="form-control"
              rows="3"
            ></textarea>
          </div>

          <div className="col-5 form-group clinic-avatar">
            <label>
              <strong>Ảnh phòng khám:</strong>
            </label>
            <br />
            <input
              onChange={handlOnChangeAvatar}
              type="file"
              // value={avatar.imageBase64}
            />
            <div className="previewImage">
              {avatar.imageBase64 && (
                <img src={avatar.imageBase64} alt="Ảnh Tạm Thời" />
              )}
            </div>
          </div>
          <div class=" col-5 form-group spcialty-address">
            <label>
              <strong>Địa chỉ phòng khám:</strong>
            </label>
            <textarea
              value={inputClinic.address}
              className="form-control"
              placeholder="Điền địa chỉ phòng khám"
              onChange={(e) => {
                handlOnChangeClinic(e, "addressClinic");
              }}
              rows="3"
            ></textarea>
          </div>
          {/* <div className="col-5 form-group spcialty-address">
            <label>
              <strong>Địa chỉ phòng khám:</strong>
            </label>
            <br />
            <input
              value={inputClinic.address}
              className="form-control"
              placeholder="Điền địa chỉ phòng khám"
              onChange={(e) => {
                handlOnChangeClinic(e, "addressClinic");
              }}
            />
          </div> */}
        </div>
        <div className="col-12 mf-5 mr-5">
          <h3 style={{ color: "blue", margin: " 20px 0" }}></h3>
          <hr />
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={handleEditorChange}
            value={desMarkdown.descriptionMarkdown}
          />
        </div>
        <div className="col-12 mt-3">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Lưu thông tin
          </button>
        </div>
      </div>
    </>
  );
}
export default ClinicManage;

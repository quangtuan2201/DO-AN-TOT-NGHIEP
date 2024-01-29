import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonUtils from "../../../utils/CommonUtils";
import "./SpecialtyManage.scss";
import specialtyService from "../../../services/specialtyService";
import { FormattedMessage, useIntl } from "react-intl";

import { toast } from "react-toastify";

function SpecialtyManage() {
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

  const [nameSpecialty, setNameSpecialty] = useState("");
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
  const handlOnChangeSpecialty = (e) => {
    const nameSecialty = e.target.value;
    setNameSpecialty(nameSecialty);
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
        name: nameSpecialty,
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
      const response = await specialtyService.handlCreateNewSpecialty(formData);
      if (response) {
        toast.success("Tạo chuyên khoa thành công.");
      } else {
        toast.error("Tạo chuyên khoa thất bại");
      }
      setAvatar(() => {
        return { imageBase64: "" };
      });
      setNameSpecialty("");
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
      <div className=" manage-specialty-container ml-5 mr-5">
        <div className="text-center mt-4 title">
          <FormattedMessage id="manage-specialty.specialty-title" />
        </div>
        <div className="row d-flex justify-content-between align-items-center add-new-spcialty ">
          <div className="col-5 form-group spcialty-chosse ">
            <label>
              <strong>
                {" "}
                <FormattedMessage id="manage-specialty.choose-speciality" />
              </strong>
            </label>
            <input
              value={nameSpecialty}
              className="form-control"
              onChange={handlOnChangeSpecialty}
            />
          </div>
          <div className="col-5 form-group spcialty-avatar">
            <label>
              <strong>
                <FormattedMessage id="manage-specialty.choose-image" />
              </strong>
            </label>
            <br />
            <input onChange={handlOnChangeAvatar} type="file" />
            <div className="previewImage">
              {avatar.imageBase64 && (
                <img src={avatar.imageBase64} alt="Ảnh Tạm Thời" />
              )}
            </div>
          </div>
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
          <button className="btn btn-primary pl-2 pr-2 " onClick={handleSubmit}>
            <FormattedMessage id="manage-specialty.button" />
          </button>
        </div>
      </div>
    </>
  );
}
export default SpecialtyManage;

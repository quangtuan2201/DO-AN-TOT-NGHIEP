import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HandbookManage.scss";
import { toast } from "react-toastify";
import { FormattedMessage, useIntl } from "react-intl";
import * as actions from "../../../store/actions";
import Select from "react-select";
import * as services from "../../../services";
import _ from "lodash";
import CommonUtils from "../../../utils/CommonUtils";

function HandbookManage() {
  const mdParser = new MarkdownIt();
  const dispatch = useDispatch();
  const [desMarkdown, setDesMarkdown] = useState({
    descriptionMarkdown: "",
    descriptionHTML: "",
  });
  const [chosseSpecialty, setChosseSpecialty] = useState({
    label: "Chọn chuyên khoa...",
    value: "",
  });
  const [avatar, setAvatar] = useState({
    imageBase64: "",
  });
  const [titlePost, setTitlePost] = useState("");

  //get language

  // handle wirte description content
  const handleEditorChange = ({ html, text }) => {
    setDesMarkdown((pre) => ({
      ...pre,
      descriptionMarkdown: text,
      descriptionHTML: html,
    }));
  };
  const handlChangeTitle = (titlePost) => {
    if (!titlePost) {
      return;
    }
    setTitlePost(titlePost);
  };
  const onChange = (specialty) => {
    console.log("Chuyên khoa: ", specialty);
    if (_.isEmpty(specialty)) {
      console.error("Chuyên khoa chưa được chọn: ");
      return;
    }
    setChosseSpecialty(specialty);
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
  const { language, allSpecialty } = useSelector((state) => {
    const specialtyOption = state.specialtys.listSpecialtys;
    const data =
      !_.isEmpty(specialtyOption) &&
      specialtyOption.map((item) => {
        return {
          value: item.id,
          label: item?.name,
        };
      });
    return {
      language: state.app.language,
      allSpecialty: data,
    };
  });
  useEffect(() => {
    dispatch(actions.fetchGetAllSpecialty());
  }, [dispatch]);
  // handle submit data
  const handleSubmit = async () => {
    try {
      const formData = {
        ...desMarkdown,
        specialtyId: chosseSpecialty.value,
        image: avatar.imageBase64,
        title: titlePost,
      };
      if (
        !formData.title ||
        !formData.image ||
        !formData.specialtyId ||
        !formData.descriptionHTML ||
        !formData.descriptionMarkdown
      ) {
        toast.error("Các trường dữ liệu không được để trống !");
        return;
      }
      console.log("form data: ", formData);
      const response = await services.handlCreateNewSpecialty(formData);
      console.log("phản hồi của backend: ", response);
      if (response) {
        toast.success("Tạo cẩm nang thành công.");
      } else {
        toast.error("Tạo cẩm nang thất bại");
      }
      setDesMarkdown({
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
      setAvatar(() => {
        return { imageBase64: "" };
      });
      setChosseSpecialty({
        label: "Chọn chuyên khoa",
        value: "",
      });
      setTitlePost("");
    } catch (error) {
      console.error("Fetch create specialty fail.");
    }
  };
  return (
    <>
      <div className=" manage-hanbook-container ml-5 mr-5">
        <h2 className="text-center text-primary mt-4 ms-title text-uppercase font-weight-bold ">
          <FormattedMessage id="manage-hanbook.hanbook-title" />
        </h2>
        <div className="row mb-5">
          <div className="belong-to-specialty col-3 mb-5 ">
            <label>
              <strong>Chọn chuyên khoa:</strong>
            </label>
            <Select
              options={allSpecialty}
              onChange={onChange}
              value={chosseSpecialty}
            />
          </div>
          <div className="belong-to-specialty col-3 mb-5 ">
            <label for="exampleInputEmail1">
              <strong>Tiêu đề:</strong>
            </label>
            <input
              className="form-control"
              placeholder="Tiêu đề..."
              onChange={(e) => {
                handlChangeTitle(e.target.value);
              }}
              value={titlePost}
              // options={allSpecialty}
              // onChange={onChange}
              // value={chosseSpecialty}
            />
          </div>
          <div className="col-3 avatar-hanbook">
            <label>
              <strong>Chọn file:</strong>
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
export default HandbookManage;

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./HandbookManage.scss";
import { toast } from "react-toastify";
import { FormattedMessage, useIntl } from "react-intl";

function HandbookManage() {
  const mdParser = new MarkdownIt();
  const dispatch = useDispatch();
  const [content, setContent] = useState({
    descriptionMarkdown: "",
    descriptionHTML: "",
  });
  const [desMarkdown, setDesMarkdown] = useState({
    descriptionMarkdown: "",
    descriptionHTML: "",
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
  // handle submit data
  const handleSubmit = async () => {
    try {
      const formData = {
        ...desMarkdown,
      };
      if (!formData.descriptionHTML || !formData.descriptionMarkdown) {
        toast.error("Các trường dữ liệu không được để trống !");
        return;
      }
      const response = true;
      // await specialtyService.handlCreateNewSpecialty(formData);
      if (response) {
        toast.success("Tạo cẩm nang thành công.");
      } else {
        toast.error("Tạo cẩm nang thất bại");
      }
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
        <h2 className="text-center text-primary mt-4 ms-title text-uppercase font-weight-bold ">
          <FormattedMessage id="manage-hanbook.hanbook-title" />
        </h2>

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
export default HandbookManage;

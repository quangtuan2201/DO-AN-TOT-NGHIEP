import { memo, useState, useRef, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment, { lang } from "moment";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import patientService from "../../../../services/patientService";
import CommonUtils from "../../../../utils/CommonUtils";
import "./RemedyModal.scss";
import {
  Form,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";
import { LANGUAGES } from "../../../../utils";

function RemedyModal({
  isShowModal,
  handlShowModalConfirm,
  dataModal,
  status,
  handlSetIsLoading,
}) {
  const dispatch = useDispatch();
  const inputRefs = [useRef(null), useRef(null)];
  const [dataPatient, setDataPatione] = useState({});
  const [contentReason, setContentReason] = useState("");
  const [formData, setFormData] = useState({
    email: dataModal.email,
    // status: status,
  });

  const handlOnChangeEmail = async (e) => {
    let dataEmail = e.target.value;
    setFormData((pre) => ({
      ...pre,
      email: dataEmail,
    }));
  };
  const handleChangeImage = async (event) => {
    const file = event.target.files;
    if (file && file[0]) {
      let base64 = await CommonUtils.getBase64(file[0]);
      setFormData((pre) => ({
        ...pre,
        imageBase64: base64,
      }));
    }
  };
  const handlChangeDescription = (e) => {
    setFormData((pre) => ({
      ...pre,
      description: e.target.value,
    }));
  };

  const handlSubmit = async (e) => {
    e.preventDefault();
    try {
      handlSetIsLoading(true);
      const response = await patientService.handlSendRemedy(formData);
      if (response) {
        handlSetIsLoading(false);
        toast.success("Xác nhận đặt lịch khám thành công.");
        handlShowModalConfirm();
      } else {
        handlSetIsLoading(false);
        toast.error("Xác nhận đặt lịch khám thất bại.");
      }
      setFormData({});
    } catch (error) {
      console.error("errror " + error.message);
    }
  };
  useEffect(() => {
    setFormData((pre) => ({
      ...pre,
      ...dataModal,
      status,
    }));
  }, [dataModal, status]);

  return (
    <div>
      <Modal
        className="modal-container mt-5"
        isOpen={isShowModal}
        toggle={handlShowModalConfirm}
        maxWidth="300px"
      >
        <ModalHeader className="text-center">
          Xác nhận lịch đặt khám
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handlSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label>Email bệnh nhân:</Label>
                  <Input
                    value={formData?.email}
                    onChange={handlOnChangeEmail}
                  />
                </FormGroup>
              </Col>
              {status && status === "CONFIRM" ? (
                <>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleEmail">Chọn file đơn thuốc:</Label>
                      <Input
                        onChange={handleChangeImage}
                        type="file"
                        name="image"
                        innerRef={inputRefs[1]}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={12}>
                    <FormGroup>
                      <Label for="exampleEmail">Ghi chú:</Label>
                      <Input
                        onChange={handlChangeDescription}
                        type="textarea"
                        name="description"
                        innerRef={inputRefs[1]}
                        value={formData?.description}
                      />
                    </FormGroup>
                  </Col>
                </>
              ) : (
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleEmail">Lý do hủy:</Label>
                    <Input
                      onChange={handlChangeDescription}
                      type="textarea"
                      name="description"
                      innerRef={inputRefs[1]}
                      value={formData?.description}
                    />
                  </FormGroup>
                </Col>
              )}
            </Row>
            <Row>
              <Col md={12} className="d-flex justify-content-between">
                <Button color="warning" type="submit">
                  Xác nhận
                </Button>
                <Button
                  color="danger"
                  isOpen={isShowModal}
                  onClick={() => {
                    setFormData({
                      email: "",
                      imageBase64: "",
                    });
                    handlShowModalConfirm();
                  }}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}
export default memo(RemedyModal);

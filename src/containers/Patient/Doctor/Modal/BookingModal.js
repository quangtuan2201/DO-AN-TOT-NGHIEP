import { memo, useState } from "react";
import "./BookingModal.scss";
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

function BookingModal({ id, isOpenModal, toggle, allAvalableTime }) {
  console.log("Isopen: ", isOpenModal);
  if (!id) {
    console.error("Id Requied parameter !");
    id = 0;
  }
  if (!allAvalableTime) {
    allAvalableTime = {};
    console.error("allAvalableTime null or undefined");
  }
  console.log("Danh sách giờ làm việc trong ngày đã chọn : ", allAvalableTime);
  console.log("id doctor : ", id);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    reason: "", //Lý do
    appointment: "", // đặt lịch cho ai
    gender: "",
  });

  // const toggle = () => setModal(!modal);

  const checkIsValid = () => {};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlSubmit = (e) => {
    console.log(e.preventDefault());
    console.log("Data modal : ", formData);
    setFormData({
      name: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "", //Lý do
      appointment: "", // đặt lịch cho ai
      gender: "",
    });
  };
  return (
    <div>
      <Modal
        className="modal-container mt-5"
        isOpen={isOpenModal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>BookingCare</ModalHeader>
        <ModalBody>
          <Form onSubmit={handlSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="">Họ tên</Label>
                  <Input
                    // invalid
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Số điện thoại</Label>
                  <Input
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    name="phoneNumber"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Địa chỉ email</Label>
                  <Input
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    type="email"
                    // valid
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Địa chỉ liên hệ</Label>
                  <Input
                    value={formData.address}
                    onChange={handleChange}
                    name="address"
                  />
                </FormGroup>
              </Col>
              <Col md={12}>
                <FormGroup>
                  <Label for="exampleEmail">Lý do khám</Label>
                  <Input
                    value={formData.reason}
                    onChange={handleChange}
                    name="reason"
                    type="textarea"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Đặt cho ai</Label>
                  <Input
                    value={formData.appointment}
                    onChange={handleChange}
                    name="appointment"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleEmail">Giới tính</Label>
                  <Input
                    value={formData.gender}
                    onChange={handleChange}
                    name="gender"
                    type="select"
                  >
                    <option value="">Select an option</option>
                    <option value="M">Name</option>
                    <option value="F">Nữ</option>
                    <option value="O">Khác</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col md={12} className="d-flex justify-content-between">
                <Button color="primary" type="submit">
                  Submit
                </Button>
                <Button color="secondary" isOpen={isOpenModal} onClick={toggle}>
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
export default memo(BookingModal);

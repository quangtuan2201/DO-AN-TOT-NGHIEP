import { memo, useState, useRef, useEffect, useContext } from "react";
import ProfileDoctor from "../ProfileDoctor";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import moment, { lang } from "moment";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import patientService from "../../../../services/patientService";
import { ThemeContextDoctorSchedule } from "../../Clinic/DoctorSchedule";
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
import { LANGUAGES } from "../../../../utils";

function BookingModal({ id, handlSetIsLoading }) {
  const { isOpenModal, handlShowModal, selectedTimeSlot } = useContext(
    ThemeContextDoctorSchedule
  );
  const dispatch = useDispatch();
  const inputRefs = [useRef(null), useRef(null)];
  const [selectedBirthDay, setSelectedBirthDay] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { language, genders } = useSelector((state) => {
    return {
      language: state.app.language,
      genders: state.admin.gender,
    };
  });
  // const checkLang = language && LANGUAGES.VI;

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    reason: "", //Lý do
    date: "", // đặt lịch cho ai
    gender: "",
    doctorId: "",
    language: "",
    birthday: "",
  });

  if (!selectedTimeSlot) {
  } else {
    formData.timeType = selectedTimeSlot.timeType;
    formData.doctorId = selectedTimeSlot.doctorId;
    formData.date = selectedTimeSlot.date;
  }

  useEffect(() => {
    dispatch(actions.fetchKeysStart(["GENDER"]));
    return () => {};
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleChangeBirthday = (date) => {
    const momentObject = moment(date[0]);
    if (!momentObject.isValid()) {
      console.error("Invalid moment object: ", momentObject);
      return;
    } else {
      let formattedDate = new Date(momentObject).getTime();
      setSelectedBirthDay(date[0]);
      setFormData((pre) => ({
        ...pre,
        birthday: formattedDate,
      }));
    }
  };
  // Hàm lấy thông tin ngày khung giờ đặt
  const renderTimeBooking = (language) => {
    const checkLang = language === LANGUAGES.VI;
    const bookFrameHours = checkLang
      ? selectedTimeSlot?.timeTypeData?.valueVn
      : selectedTimeSlot?.timeTypeData?.valueEn;
    const timestamp = +selectedTimeSlot?.date;
    const date = moment(timestamp).toDate();
    const dateVn = moment(date).format("dddd - DD/MM");
    const dateEn = moment(date).locale("en").format("ddd - DD/MM");
    return `${bookFrameHours}, ${checkLang ? dateVn : dateEn}`;
  };

  //Hàm lấy fullName
  const builDoctorName = (language) => {
    const { firstName, lastName } = selectedTimeSlot.doctorData;
    const checkLang = language && language === LANGUAGES.VI;
    const fullName = checkLang
      ? `${lastName} ${firstName}`
      : `${firstName} ${lastName}`;
    return fullName;
  };
  const handlSubmit = async (e) => {
    try {
      e.preventDefault(); /*e.preventDefault(), bạn có thể thực hiện xử lý dữ liệu của mình
    hoặc thực hiện các hành động cần thiết mà không gây ra việc tải lại trang.*/
      const {
        fullName,
        phoneNumber,
        email,
        address,
        reason,
        date,
        gender,
        birthday,
      } = formData;
      if (
        !fullName ||
        !phoneNumber ||
        !email ||
        !address ||
        !reason ||
        !date ||
        !gender ||
        !birthday
      ) {
        toast.error("Vui lòng điền đầy đủ thông tin !");
        return;
      }

      const phoneNumberRegex = /^\d{10,11}$/; // Regex cho 10 hoặc 11 chữ số
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!phoneNumberRegex.test(formData.phoneNumber)) {
        toast.error("Số điện thoại không đúng định dạng !");
        setFormData((pre) => ({
          ...pre,
          phoneNumber: (pre.phoneNumber = ""),
        }));
        inputRefs[0].current.focus();
        return;
      }

      if (!emailRegex.test(formData.email)) {
        toast.error("Hãy nhập địa chỉ email hợp lệ.\n VD:.Example@gmail.com");
        setFormData((pre) => ({
          ...pre,
          email: (pre.email = ""),
        }));
        inputRefs[1].current.focus();
        return;
      }
      const timebooking = renderTimeBooking(language);
      formData.timeString = timebooking;
      const doctorName = builDoctorName(language);
      formData.doctorName = doctorName;
      formData.doctorId = selectedTimeSlot.doctorId;
      formData.language = language;

      // dispatch(actions.changLoading(true));
      handlSetIsLoading(true);
      const result = await patientService.handlSavePatientBookAppointment(
        formData
      );
      if (result) {
        handlShowModal();
        handlSetIsLoading(false);
        toast.success("Tạo lịch hẹn khám thành công.");
      } else {
        handlSetIsLoading(false);
        toast.error("Tạo lịch hẹn khám không thành công.");
      }
      setSelectedBirthDay(new Date());
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        reason: "", //Lý do
        date: "",
        gender: "",
        timeType: "",
        timeString: "",
      });
    } catch (error) {
      toast.error("Tạo lịch hẹn khám không thành công.");
    }
  };

  return (
    <div>
      <Modal
        className="modal-container mt-5"
        isOpen={isOpenModal}
        toggle={handlShowModal}
      >
        <ModalHeader className="text-center" toggle={handlShowModal}>
          Đặt lịch khám bệnh
        </ModalHeader>
        <ModalBody>
          <div>
            <ProfileDoctor
              id={id}
              isShowDescription={false}
              selectedTimeSlot={selectedTimeSlot}
            />
          </div>
          <Form onSubmit={handlSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="">Họ tên</Label>
                  <Input
                    // invalid
                    value={formData.fullName}
                    onChange={handleChange}
                    name="fullName"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Số điện thoại</Label>
                  <Input
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    name="phoneNumber"
                    type="number"
                    innerRef={inputRefs[0]}
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
                    innerRef={inputRefs[1]}
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
                  <Label>Lý do khám</Label>
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
                  <Label>Ngày sinh</Label>
                  <DatePicker
                    className={"form-control"}
                    value={selectedBirthDay}
                    // minDate={new Date()}
                    onChange={handleChangeBirthday}
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
                    {genders &&
                      genders.map((item, index) => (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI
                            ? item.valueVn
                            : item.valueEn}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={12} className="d-flex justify-content-between">
                <Button color="warning" type="submit">
                  Xác nhận
                </Button>
                <Button
                  color="danger"
                  isOpen={isOpenModal}
                  onClick={() => {
                    setFormData({
                      fullName: "",
                      phoneNumber: "",
                      email: "",
                      address: "",
                      reason: "", //Lý do
                      date: "", // đặt lịch cho ai
                      gender: "",
                      timeType: "",
                      timeString: "",
                      doctorId: "",
                    });
                    handlShowModal();
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
export default memo(BookingModal);

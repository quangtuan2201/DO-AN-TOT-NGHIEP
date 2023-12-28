// function Specialty() {}
import "./Specialty.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import Slider from "react-slick";
import * as actions from "../../../store/actions";

// Import css files
import { FormattedMessage, useIntl } from "react-intl";
import specialtyService from "../../../services/specialtyService";
function Specialty(props) {
  // console.log("props: ", props);
  const dispatch = useDispatch();
  const history = useHistory();
  const [specialtyLists, setSpecialtyLists] = useState([]);
  const handleViewSpecialtyDoctor = (specialty) => {
    // console.log("handle click view: ", specialty);
    history.push(`/detail-specialty/${specialty.id}`);
  };
  const listSpecialtys = useSelector((state) => {
    // console.log("state: ", state);
    return state.specialtys.listSpecialtys;
  });
  useEffect(() => {
    // (async () => {
    //   try {
    //     const response = await specialtyService.handlGetAllSpecialty();
    //     if (response) {
    //       console.log("Data list specialty: ", response);
    //       setSpecialtyLists(response);
    //     } else {
    //       console.log("Fetch get all specialty fail,,,");
    //     }
    //   } catch (error) {
    //     console.error("Fetch get all specilty fail...");
    //   }
    // })();
    dispatch(actions.fetchGetAllSpecialty());
  }, []);
  // console.log("==============>>>>>>>>>> listSpecialtys: ", listSpecialtys);
  return (
    <React.Fragment>
      <div className="section-specialty section-share ">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="popularSpeciality.popularSpeciality" />
            </span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...props.settings}>
              {listSpecialtys &&
                listSpecialtys.map((item, index) => (
                  <div
                    key={index}
                    className="section-customize"
                    onDoubleClick={() => {
                      handleViewSpecialtyDoctor(item);
                    }}
                  >
                    <div
                      className="bg-image section-specialty"
                      style={{ backgroundImage: `url("${item.image}")` }}
                    />
                    <span className="section-descrip">{item.name}</span>
                  </div>
                ))}

              {/* <div className="section-customize">
                <div className="bg-image section-specialty"></div>
                <span className="section-descrip">Cơ xương khớp</span>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <span className="section-descrip">Cơ xương khớp</span>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <span className="section-descrip">Cơ xương khớp</span>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <span className="section-descrip">Cơ xương khớp</span>
              </div>
              <div className="section-customize">
                <div className="bg-image section-specialty" />
                <span className="section-descrip">Cơ xương khớp</span>
              </div> */}
            </Slider>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Specialty;

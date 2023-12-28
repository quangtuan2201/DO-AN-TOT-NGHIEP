import "./MedicalFacility.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import Slider from "react-slick";
// Import css files
import { FormattedMessage, useIntl } from "react-intl";
import clinicService from "../../../services/clinicService";
import * as actions from "../../../store/actions";

function MedicalFacility(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(actions.fetchGetAllClinic());
  }, []);
  const { listClinics } = useSelector((state) => {
    return {
      listClinics: state.specialtys.listClinics,
    };
  });
  const handleViewDetailDoctor = (clinicId) => {
    // console.log("handle click view: ", doctor);
    history.push(`/detail-clinic/${clinicId}`);
  };
  // console.log("List clinic: ", listClinics);
  return (
    <React.Fragment>
      <div className="section-specialty section-share ">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế nổi bật</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...props.settings}>
              {Array.isArray(listClinics) &&
                listClinics.length > 0 &&
                listClinics.map((item) => {
                  return (
                    <div
                      className="section-customize"
                      onDoubleClick={() => {
                        handleViewDetailDoctor(item.id);
                      }}
                      key={item.id}
                    >
                      <div
                        className="bg-image section-medical-facility"
                        style={{
                          backgroundImage: `url(${item?.image})`,
                        }}
                      />
                      <span className="section-descrip">{item?.name}</span>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default MedicalFacility;

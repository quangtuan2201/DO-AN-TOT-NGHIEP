import "./MedicalFacility.scss";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";

import Slider from "react-slick";
// Import css files
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
    history.push(`/detail-clinic/${clinicId}`);
  };
  return (
    <React.Fragment>
      <div
        className="section-specialty section-share medical-facility"
        style={{ paddingBottom: "30px" }}
      >
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="banner.outstanding-medical-facilities" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homePage.see-more" />
            </button>
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

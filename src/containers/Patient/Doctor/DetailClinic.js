import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from "../../../store/actions";
import "./DetailClinic.scss";
import clinicService from "../../../services/clinicService";
function DetailClinic() {
  const { id } = useParams();
  const [infoDetailClinic, setInfoDetailClinic] = useState({});
  const { language, doctor } = useSelector((state) => {
    // console.log("State redux: ", state);
    return {
      language: state.app.language,
      doctor: state.doctor.detailDoctor,
    };
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await clinicService.handlGetInfoDetailClinic(id);
        if (response) {
          setInfoDetailClinic(response);
        } else {
          setInfoDetailClinic({});
        }
      } catch (error) {
        console.error(`Fetch info clinic fail.${error.message}`);
      }
    })();
  }, []);
  return (
    <React.Fragment>
      <HomeHeader isShowHeader={false} />
      <div className=" clinic-detail-container  mt-5">
        <HomeHeader />
        {infoDetailClinic && (
          <div clinic-detail-body>
            <div className="detail-clinic-header">
              <div
                className="avatar"
                style={{ backgroundImage: `url(${infoDetailClinic?.image})` }}
              >
                img
              </div>
              <div className="clinic-title ">
                <h1>{infoDetailClinic.name}</h1>
              </div>
            </div>

            <div
              className="detail-clinic-description"
              dangerouslySetInnerHTML={{
                __html: infoDetailClinic.descriptionHTML,
              }}
            />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default DetailClinic;

import React, { Component, useState, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from "../../../store/actions";
import "./DetailDoctor.scss";
function DetailDoctor() {
  const { id } = useParams();
  const dispatch = useDispatch();
  //   const [doctor, setDoctor] = useState(null);
  const { language, doctor } = useSelector((state) => {
    console.log("State redux: ", state);
    return {
      language: state.app.language,
      doctor: state.admin.detailDoctor,
    };
  });
  useEffect(() => {
    //     const detaiDoctor = async () => {
    //       const doctor = await doctorService.handleGetDetailDoctor(id);
    //       console.log("doctor: ", doctor);
    //       setDoctor(doctor);
    //     };
    //     detaiDoctor();
    console.log("id: ", id);
    dispatch(actions.fetchGetDetailDoctor(id));
  }, []);
  //   console.log("Image: ", doctor.image);
  return (
    <React.Fragment>
      <HomeHeader isShowHeader={false} />
      <div className="container doctor-detail-container  mt-4">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{ backgroundImage: `url(${doctor.image})` }}
          ></div>
          <div className="content-right">
            <div className="up">
              {`${doctor?.positionData?.valueVn}.${doctor?.lastName} ${doctor?.firstName} `}
            </div>
            <div className="down">
              {" "}
              <span>{doctor?.Markdown?.description}</span>
            </div>
          </div>
        </div>
        <div className="schedule-doctor"></div>

        <div
          className="detail-doctor"
          dangerouslySetInnerHTML={{ __html: doctor?.Markdown?.contentHTML }}
        ></div>

        <div className="comment-doctor"></div>
      </div>
      <div className="bk-image">
        <img src="https://github.com/quangtuan2201/sharing-host-free/blob/main/IMG/allissa_Shin.jpg?raw=true"></img>
      </div>
    </React.Fragment>
  );
}
export default DetailDoctor;

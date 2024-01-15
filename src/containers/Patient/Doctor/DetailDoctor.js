import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from "../../../store/actions";
import DoctorSchedule from "../Clinic/DoctorSchedule";
import DoctorExtraInfo from "./DoctorExtraInfo";
import LikeAndShare from "../SocialPlugin/LikeAndShare";
import Comment from "../SocialPlugin/Comment";
import "./DetailDoctor.scss";
function DetailDoctor() {
  const { id } = useParams();
  const dispatch = useDispatch();
  let currentURL =
    +process.env.REACT_APP_IS_LOCALHOST === 1
      ? `http://localhost:3000/detail-doctors/${id}`
      : window.location.href;
  console.log("currentURL: ", currentURL);
  const { language, doctor } = useSelector((state) => {
    return {
      language: state.app.language,
      doctor: state.doctor.detailDoctor,
    };
  });

  useEffect(() => {
    dispatch(actions.fetchGetDetailDoctor(id));
  }, []);
  return (
    <React.Fragment>
      <HomeHeader isShowHeader={false} />
      <div className=" doctor-detail-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{ backgroundImage: `url(${doctor.image})` }}
          ></div>
          <div className="content-right">
            <div className="up">
              <h1>{`${doctor?.positionData?.valueVn},${doctor?.lastName} ${doctor?.firstName} `}</h1>
            </div>
            <div className="down">
              <span>{doctor?.Markdown?.description}</span>
            </div>
            <div className="like-share-plugin">
              <h3>like and share</h3>
              <LikeAndShare dataHref={currentURL} />
            </div>
          </div>
        </div>
        <div className="schedule-doctor">
          <div className="content-left">
            <DoctorSchedule id={id} />
          </div>
          <div className="content-right">
            <DoctorExtraInfo id={id} />
          </div>
        </div>

        <div
          className="detail-info-doctor"
          dangerouslySetInnerHTML={{ __html: doctor?.Markdown?.contentHTML }}
        ></div>
        <div className="comment-doctor" style={{ height: "200px" }}>
          <Comment dataHref={currentURL} width={"100%"} />
        </div>
      </div>
    </React.Fragment>
  );
}
export default DetailDoctor;

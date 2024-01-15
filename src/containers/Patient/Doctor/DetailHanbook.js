import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from "../../../store/actions";
import * as services from "../../../services";
import moment from "moment";
import "./DetailHanbook.scss";

function DetailHanbook() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [detailHanbook, setDetailHanbook] = useState({});
  const { language } = useSelector((state) => {
    return {
      language: state.app.language,
    };
  });

  useEffect(() => {
    if (!id) {
      console.error("missing parameter id hanbook");
      return;
    }
    (async () => {
      const response = await services.handlGetDetailHanbook(id);
      console.log("response: ", response);
      if (response) {
        setDetailHanbook(response);
      } else {
        setDetailHanbook(null);
      }
    })();
  }, [id]);
  return (
    <>
      <HomeHeader />
      <div className="detail-hanbook-container container">
        <div
          className="bg-image section-handbook"
          style={{ backgroundImage: `url("${detailHanbook?.image}")` }}
        />
        <h1 className="text-center hanbook-tittle">{detailHanbook?.title}</h1>
        <div className="description-hanbook font-weight-bold d-flex">
          <p className="mr-2">BookingCare</p>
          <p className=" mr-2">
            Ngày tạo:
            <span className="text-primary">
              {moment(detailHanbook.createAt).format("DD-MM-YYYY")}
            </span>
          </p>
          |
          <p className=" ml-2">
            Cập nhật lần cuối:
            <span className="text-primary">
              {moment(detailHanbook.updatedAt).format("DD-MM-YYYY")}
            </span>
          </p>
        </div>
        <div
          className="detail-hanbook-description mb-5"
          dangerouslySetInnerHTML={{
            __html: detailHanbook.descriptionHTML,
          }}
        />
      </div>
    </>
  );
}
export default DetailHanbook;

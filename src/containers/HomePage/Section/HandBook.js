// function Specialty() {}
import "./HandBook.scss";
import React, { useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import * as services from "../../../services";
import Slider from "react-slick";
import _ from "lodash";

// Import css files

function HandBook(props) {
  const history = useHistory();
  const [allHandbook, setAllHanbook] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await services.handlGetAllHanbook();
      console.log("response: ", response);
      if (response) {
        setAllHanbook(response.data);
      } else {
        setAllHanbook(null);
      }
    })();
  }, []);
  const handleViewHanbook = (hanbook) => {
    history.push(`/detail-hanbook/${hanbook.id}`);
  };
  return (
    <>
      <div className="section-specialty section-share ">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="handbook.hand-book" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="homePage.see-more" />{" "}
            </button>
          </div>
          <div className="section-body">
            <Slider {...props.settings}>
              {!_.isEmpty(allHandbook) &&
                allHandbook.map((item, index) => {
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onDoubleClick={() => {
                        handleViewHanbook(item);
                      }}
                    >
                      <div
                        className="bg-image section-handbook"
                        style={{ backgroundImage: `url("${item.image}")` }}
                      />
                      <span className="section-descrip">
                        {item.title.length > 45
                          ? item.title.substring(0, 45) + "..."
                          : item.title}
                      </span>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}
export default HandBook;

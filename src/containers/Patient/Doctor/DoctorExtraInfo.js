import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../../store/actions";
import "./DoctorExtraInfo.scss";
import doctorService from "../../../services/doctorService";
import { LANGUAGES } from "../../../utils/constant";
import { FormattedMessage, useIntl } from "react-intl";
import _ from "lodash";

//{ id }
function DoctorExtraInfo({ id }) {
  const [isShoDetail, setIsShowDetail] = useState(false);
  const [infoAdressClinic, setInfoAddressClinic] = useState({});
  const { language } = useSelector((state) => {
    return {
      language: state.app.language,
    };
  });
  const checkLang = language === LANGUAGES.VI;
  const formatter = new Intl.NumberFormat(checkLang ? "vi-VN" : "en-US", {
    style: "currency",
    currency: checkLang ? "VND" : "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    if (!id) {
      console.error("Requires id parameter!");
      return; // or handle the case where id is not available
    }
    (async () => {
      try {
        const response = await doctorService.handlGetInfoAddressClinic(
          id,
          signal
        );
        if (response) {
          setInfoAddressClinic(response);
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [id]);
  return (
    <React.Fragment>
      <div className="doctor-extra-info-container">
        <div className="content-up">
          <div className="text-address">
            <FormattedMessage id="doctor-extra-info.price" />
          </div>
          <div className="name-clinic">{infoAdressClinic?.nameClinic}</div>
          <div className="detail-address">
            {infoAdressClinic?.addressClinic}
          </div>
        </div>
        {!_.isEmpty(infoAdressClinic) && (
          <div className="content-down">
            {isShoDetail ? (
              <>
                <div className="mt-2 mb-2">
                  <strong className="text-uppercase">
                    <FormattedMessage id="doctor-extra-info.price" />{" "}
                  </strong>
                </div>
                <div className="benefit">
                  <div className="price">
                    <strong className="text-uppercase">
                      <FormattedMessage id="doctor-extra-info.price" />{" "}
                    </strong>
                    <strong>
                      {!_.isEmpty(infoAdressClinic) &&
                        formatter.format(
                          checkLang
                            ? infoAdressClinic?.priceData?.valueVn
                            : infoAdressClinic?.priceData?.valueEn
                        )}
                    </strong>
                  </div>
                  <div>
                    <FormattedMessage id="doctor-extra-info.preferential" />
                  </div>
                  <div className="note"> {infoAdressClinic.note}</div>
                </div>
                <div className="payments">
                  <FormattedMessage id="doctor-extra-info.payment-method" />
                  <strong className="ml-1">
                    {checkLang
                      ? infoAdressClinic?.paymentData.valueVn
                      : infoAdressClinic?.paymentData.valueEn}
                  </strong>
                  <span
                    onClick={() => {
                      setIsShowDetail(!isShoDetail);
                    }}
                    style={{ color: "blue" }}
                  >
                    <FormattedMessage id="doctor-extra-info.hide details" />
                  </span>
                </div>
              </>
            ) : (
              <div className="medical-price">
                <span className="text-uppercase">
                  <FormattedMessage id="doctor-extra-info.price" />
                </span>
                <strong>
                  {!_.isEmpty(infoAdressClinic) &&
                    formatter.format(
                      checkLang
                        ? infoAdressClinic?.priceData?.valueVn
                        : infoAdressClinic?.priceData?.valueEn
                    )}
                </strong>
                <span
                  onClick={() => {
                    setIsShowDetail(!isShoDetail);
                  }}
                  style={{ color: "blue" }}
                >
                  <FormattedMessage id="doctor-extra-info.see-details" />
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default memo(DoctorExtraInfo);

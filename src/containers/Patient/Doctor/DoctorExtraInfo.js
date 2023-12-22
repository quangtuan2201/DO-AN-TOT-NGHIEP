import React, { useState, useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import * as actions from "../../../store/actions";
import "./DoctorExtraInfo.scss";
import doctorService from "../../../services/doctorService";
import { LANGUAGES } from "../../../utils/constant";
//{ id }
function DoctorExtraInfo() {
  const { id } = useParams();
  console.log("-----re-render---------DoctorExtraInfo");
  const dispatch = useDispatch();
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
  // console.log("id doctor : ", id);
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
        // console.log("data res info address: ", response);
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
          <div className="text-address">Địa chỉ giá khám</div>
          <div className="name-clinic">{infoAdressClinic?.nameClinic}</div>
          <div className="detail-address">
            {infoAdressClinic?.addressClinic}
          </div>
        </div>
        <div className="content-down">
          {isShoDetail ? (
            <>
              <div className="mt-2 mb-2">
                <strong className="text-uppercase"> Giá Khám:</strong>
              </div>
              <div className="benefit">
                <div className="price">
                  <strong className="text-uppercase">Giá khám: </strong>
                  <strong>
                    {infoAdressClinic &&
                      formatter.format(
                        checkLang
                          ? infoAdressClinic?.priceData?.valueVn
                          : infoAdressClinic?.priceData?.valueEn
                      )}
                  </strong>
                </div>
                <div>Được ưu tiên khám trước khi đặt qua bookingcare </div>
                <div className="note"> {infoAdressClinic.note}</div>
              </div>
              <div className="payments">
                Người bệnh có thể thanh toán chi phí bằng hình thức
                <strong>
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
                  Ẩn chi tiết
                </span>
              </div>
            </>
          ) : (
            <div className="medical-price">
              <span className="text-uppercase">Giá khám:</span>
              <strong>
                {infoAdressClinic &&
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
                Xem chi tiết !
              </span>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default memo(DoctorExtraInfo);

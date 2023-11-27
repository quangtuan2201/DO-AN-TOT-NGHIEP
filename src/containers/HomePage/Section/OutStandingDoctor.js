import "./OutStandingDoctor.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
// Import css files
import { FormattedMessage, useIntl } from "react-intl";

function OutStandingDoctor(props) {
  return (
    <React.Fragment>
      <div className="section-specialty section-share ">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Bác sĩ nổi bật</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...props.settings}>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="bg-outer text-center">
                    <div className="bg-image section-outstanding-doctor " />
                    <div className="section-descrip">
                      GS,TS.Nguyễn Tuấn Anh1
                    </div>
                    <br></br>
                    <div className="section-descrip">Gia liễu</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="bg-outer text-center">
                    <div className="bg-image section-outstanding-doctor " />
                    <div className="section-descrip">
                      GS,TS.Nguyễn Tuấn Anh2
                    </div>
                    <br></br>
                    <div className="section-descrip">Gia liễu</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="bg-outer text-center">
                    <div className="bg-image section-outstanding-doctor " />
                    <div className="section-descrip">
                      GS,TS.Nguyễn Tuấn Anh3
                    </div>
                    <br></br>
                    <div className="section-descrip">Gia liễu</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="bg-outer text-center">
                    <div className="bg-image section-outstanding-doctor " />
                    <div className="section-descrip">
                      GS,TS.Nguyễn Tuấn Anh4
                    </div>
                    <br></br>
                    <div className="section-descrip">Gia liễu</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="bg-outer text-center">
                    <div className="bg-image section-outstanding-doctor " />
                    <div className="section-descrip">
                      GS,TS.Nguyễn Tuấn Anh5
                    </div>
                    <br></br>
                    <div className="section-descrip">Gia liễu</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="bg-outer text-center">
                    <div className="bg-image section-outstanding-doctor " />
                    <div className="section-descrip">
                      GS,TS.Nguyễn Tuấn Anh6
                    </div>
                    <br></br>
                    <div className="section-descrip">Gia liễu</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="bg-outer text-center">
                    <div className="bg-image section-outstanding-doctor " />
                    <div className="section-descrip">
                      GS,TS.Nguyễn Tuấn Anh7
                    </div>
                    <br></br>
                    <div className="section-descrip">Gia liễu</div>
                  </div>
                </div>
              </div>
              <div className="section-customize">
                <div className="customize-border">
                  <div className="bg-outer text-center">
                    <div className="bg-image section-outstanding-doctor " />
                    <div className="section-descrip">
                      GS,TS.Nguyễn Tuấn Anh8
                    </div>
                    <br></br>
                    <div className="section-descrip">Gia liễu</div>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default OutStandingDoctor;

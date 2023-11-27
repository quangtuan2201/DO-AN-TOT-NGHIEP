// function Specialty() {}
// import "./HandBook.scss";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormattedMessage, useIntl } from "react-intl";

function Abount() {
  return (
    <React.Fragment>
      <div className="section-share section-abount">
        <div className="section-abount-header">
          <span>Thông tin của tôi</span>
          <div className="section-abount-content">
            <div className="content-left">
              <iframe
                width="100%"
                height="400px"
                src="https://www.youtube.com/embed/JILtSLgKy4k"
                title=""
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div className="content-right">
              <p>
                Hãy nghĩ về mục tiêu của bạn như là một hành trình, một cuộc
                phiêu lưu đầy ý nghĩa. Dù cho con đường trước mắt có dài đến
                đâu, hãy tiếp tục bước đi và không bao giờ đầu hàng trước khó
                khăn. Mỗi bước đi của bạn là một bước tiến về phía đích đến. Có
                những lúc bạn có thể cảm thấy mệt mỏi, nhưng hãy nhớ rằng sức
                mạnh thực sự nằm trong khả năng của bạn để vượt qua những giới
                hạn đó. Mỗi ngày mới là một cơ hội để bạn bắt đầu lại, học hỏi
                từ quá khứ và hướng về tương lai với tinh thần lạc quan. Không
                ai đã đạt được mục tiêu lớn một cách dễ dàng. Điều quan trọng là
                sự kiên nhẫn và định hình tích cực. Hãy tin rằng bạn có khả năng
                và sức mạnh để vượt qua mọi thách thức. Mỗi cố gắng của bạn, mỗi
                bước đi của bạn đều đang xây dựng nên chính cuộc sống mà bạn
                mong muốn. Hãy nhìn vào gương và thấy bản thân không chỉ là
                người đang chiến đấu với cuộc sống mà còn là người đang xây dựng
                nên ước mơ của mình. Bạn xứng đáng với mọi điều tốt lành. Đừng
                bao giờ quên rằng sức mạnh lớn nhất nằm trong tâm hồn và lòng
                kiên nhẫn của bạn. Hãy bước đi với niềm tin và quyết tâm. Cuộc
                sống đang chờ đón bạn với vô vàn cơ hội. Hãy là chính bản thân
                bạn, và hãy sống đúng với những giấc mơ của mình. Bạn là người
                tạo ra chính cuộc sống mà bạn muốn. Điều đó chính là quyền lực
                và đẹp đẽ của cuộc sống.
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Abount;

import React, { useState } from "react";
import "./Chatbot.scss";
function Chatbot() {
  const [show, setShow] = useState(false);
  return (
    <div className="chatbot-container">
      <div
        onClick={() => {
          setShow(!show);
        }}
        className="chatbot-message-icon"
        style={{
          width: 60,
          height: 60,
          backgroundColor: "#0A7CFF",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 60,
        }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36">
          <path
            fill="white"
            d="M1 17.99C1 8.51488 8.42339 1.5 18 1.5C27.5766 1.5 35 8.51488 35 17.99C35 27.4651 27.5766 34.48 18 34.48C16.2799 34.48 14.6296 34.2528 13.079 33.8264C12.7776 33.7435 12.4571 33.767 12.171 33.8933L8.79679 35.3828C7.91415 35.7724 6.91779 35.1446 6.88821 34.1803L6.79564 31.156C6.78425 30.7836 6.61663 30.4352 6.33893 30.1868C3.03116 27.2287 1 22.9461 1 17.99ZM12.7854 14.8897L7.79161 22.8124C7.31238 23.5727 8.24695 24.4295 8.96291 23.8862L14.327 19.8152C14.6899 19.5398 15.1913 19.5384 15.5557 19.8116L19.5276 22.7905C20.7193 23.6845 22.4204 23.3706 23.2148 22.1103L28.2085 14.1875C28.6877 13.4272 27.7531 12.5704 27.0371 13.1137L21.673 17.1847C21.3102 17.4601 20.8088 17.4616 20.4444 17.1882L16.4726 14.2094C15.2807 13.3155 13.5797 13.6293 12.7854 14.8897Z"
          ></path>
        </svg>
      </div>
      {show && (
        <div className="chatbot-iframe">
          <i
            className="fas fa-times chatbot-close-icon"
            onClick={() => {
              setShow(!show);
            }}
          ></i>
          <iframe
            allow="microphone;"
            width="350"
            height="430"
            src="https://console.dialogflow.com/api-client/demo/embedded/bf0e97e6-e21a-49ce-ad4f-4a5ea0d01160"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default Chatbot;

import React, { Component, Fragment } from "react";
import { FormattedMessage, FormattedTime } from "react-intl";

import CustomScrollBar from "../components/CustomScrollbars";

import "./CustomToast.scss";

const CustomToast = ({ titleId, message, messageId, time }) => {
  return (
    <Fragment>
      <div className="custom-toast">
        <div className="toast-title">
          {time && (
            <span className="date">
              <FormattedTime
                hour="numeric"
                minute="numeric"
                second="numeric"
                hour12={true}
                value={time}
              />
            </span>
          )}
          <i className="fa fa-fw fa-exclamation-triangle" />
          <FormattedMessage id={titleId} />
        </div>
        {message && typeof message === "object" ? (
          <CustomScrollBar
            autoHeight={true}
            autoHeightMin={50}
            autoHeightMax={100}
          >
            {message.map((msg, index) => (
              <Fragment key={index}>
                <div className="toast-content">{msg}</div>
              </Fragment>
            ))}
          </CustomScrollBar>
        ) : (
          <div className="toast-content">
            {message ? (
              message
            ) : messageId ? (
              <FormattedMessage id={messageId} />
            ) : null}
          </div>
        )}
      </div>
    </Fragment>
  );
};

export const CustomToastCloseButton = ({ closeToast }) => {
  return (
    <button type="button" className="toast-close" onClick={closeToast}>
      <i className="fa fa-fw fa-times-circle" />
    </button>
  );
};

export default CustomToast;

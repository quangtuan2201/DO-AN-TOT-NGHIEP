import React from "react";
import { toast } from "react-toastify";
import axios from "axios";

import CustomToast from "../components/CustomToast";

const TYPE_SUCCESS = "SUCCESS";
const TYPE_INFO = "INFO";
const TYPE_WARN = "WARN";
const TYPE_ERROR = "ERROR";

const ToastUtil = {
  success: (title, message) => {
    ToastUtil.show(TYPE_SUCCESS, title, message);
  },

  info: (title, message) => {
    ToastUtil.show(TYPE_INFO, title, message);
  },

  warn: (title, message) => {
    ToastUtil.show(TYPE_WARN, title, message);
  },

  error: (title, message) => {
    ToastUtil.show(TYPE_ERROR, title, message);
  },

  successRaw: (title, message) => {
    ToastUtil.show(TYPE_SUCCESS, title, message, true);
  },

  errorRaw: (title, message, autoCloseDelay = 3000) => {
    ToastUtil.show(TYPE_ERROR, title, message, true, autoCloseDelay);
  },

  errorApi: (
    error,
    title = "common.fail-to-load-data",
    autoCloseDelay = 3000
  ) => {
    if (axios.isCancel(error)) {
      // Do nothing if request was cancelled
      return;
    }
    let message = null;
    let messageId = "common.unknown-error";
    if (error.httpStatusCode >= 500) {
      messageId = "common.internal-server-error";
    } else if (error.httpStatusCode < 500 && error.httpStatusCode >= 400) {
      if (error.httpStatusCode === 400) {
        messageId = "common.bad-request";
      } else if (error.httpStatusCode === 403) {
        messageId = "common.forbidden-request";
      }
    } else {
      // Request fail even server was returned a success response
      if (error.errorMessage) {
        message = error.errorMessage;
      }
    }
    toast.error(
      <CustomToast
        titleId={title}
        message={message}
        messageId={messageId}
        time={new Date()}
      />,
      {
        position: toast.POSITION.BOTTOM_RIGHT,
        pauseOnHover: true,
        autoClose: autoCloseDelay,
      }
    );
  },

  show: (type, title, message, rawMessage = false, autoCloseDelay = 3000) => {
    const content = (
      <CustomToast
        titleId={title}
        messageId={rawMessage ? null : message}
        message={rawMessage ? message : null}
        time={new Date()}
      />
    );
    const options = {
      position: toast.POSITION.BOTTOM_RIGHT,
      pauseOnHover: true,
      autoClose: autoCloseDelay,
    };

    switch (type) {
      case TYPE_SUCCESS:
        toast.success(content, options);
        break;
      case TYPE_INFO:
        toast.info(content, options);
        break;
      case TYPE_WARN:
        toast.warn(content, options);
        break;
      case TYPE_ERROR:
        toast.error(content, options);
        break;
      default:
        break;
    }
  },
};

export default ToastUtil;

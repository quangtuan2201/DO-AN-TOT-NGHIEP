import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import { Modal } from "reactstrap";

import "./ConfirmModal.scss";
import * as actions from "../store/actions";
import { KeyCodeUtils } from "../utils";

const ConfirmModal = () => {
  const acceptBtnRef = useRef(null);
  const contentOfConfirmModal = useSelector(
    (state) => state.app.contentOfConfirmModal
  );
  const dispatch = useDispatch();

  const handlerKeyDown = (event) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode === KeyCodeUtils.ENTER) {
      if (!acceptBtnRef.current || acceptBtnRef.current.disabled) return;
      acceptBtnRef.current.click();
    }
  };

  const onAcceptBtnClick = () => {
    if (contentOfConfirmModal.handleFunc) {
      contentOfConfirmModal.handleFunc(contentOfConfirmModal.dataFunc);
    }
    onClose();
  };

  const onClose = () => {
    dispatch(
      actions.setContentOfConfirmModal({
        isOpen: false,
        messageId: "",
        handleFunc: null,
        dataFunc: null,
      })
    );
  };

  useEffect(() => {
    document.addEventListener("keydown", handlerKeyDown);
    return () => {
      document.removeEventListener("keydown", handlerKeyDown);
    };
  }, []); // Empty dependency array to run effect only once

  return (
    <Modal
      isOpen={contentOfConfirmModal.isOpen}
      className="confirm-modal"
      centered={true}
    >
      <div className="modal-header">
        <div className="modal-title">
          <FormattedMessage id={"common.confirm"} />
        </div>
        <div className="col-auto">
          <button className="btn btn-close" onClick={onClose}>
            <i className="fal fa-times" />
          </button>
        </div>
      </div>

      <div className="modal-body">
        <div className="confirm-modal-content">
          <div className="row">
            <div className="col-12">
              <FormattedMessage
                id={
                  contentOfConfirmModal.messageId
                    ? contentOfConfirmModal.messageId
                    : "common.confirm-this-task"
                }
              />
            </div>

            <hr />

            <div className="col-12">
              <div className="btn-container text-center">
                <button className="btn btn-add" onClick={onClose}>
                  <FormattedMessage id="common.close" />
                </button>
                <button
                  ref={acceptBtnRef}
                  className="btn btn-add"
                  onClick={onAcceptBtnClick}
                >
                  <FormattedMessage id={"common.accept"} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;

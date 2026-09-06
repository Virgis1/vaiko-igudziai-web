import React from "react";

const ModalBase = ({ title, show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop-custom">
      <div className="modal-dialog modal-dialog-centered">
        <div className="custom-modal modal-content rounded-4">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            />
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalBase;

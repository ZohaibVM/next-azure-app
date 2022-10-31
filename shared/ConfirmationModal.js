import React from "react";
import { Modal } from "react-bootstrap";
import useTheme from "../hooks/useTheme";

const ConfirmationModal = ({
  message,
  show,
  handleClose,
  isDanger,
  messages,
}) => {
  const {
    selectedTheme: { primaryColor, whiteColor },
  } = useTheme();

  const pStyles = isDanger
    ? {
        color: "rgb(114, 28, 36)",
        background: "rgb(248, 215, 218)",
        padding: "1rem",
        borderRadius: 5,
        border: "1px solid rgb(245, 198, 203)",
        wordBreak: "break-word",
      }
    : {
        color: primaryColor,
      };

  const cancelButtonStyles = isDanger
    ? {
        color: "rgb(114, 28, 36)",
        border: "1px solid rgb(114, 28, 36)",
      }
    : {
        borderRadius: "0.5rem",
      };

  const continueButtonStyles = isDanger
    ? {
        backgroundColor: "rgb(114, 28, 36)",
      }
    : {
        borderRadius: "0.5rem",
      };

  const ulStyles = {
    color: "rgb(114, 28, 36)",
    padding: "1rem 0rem 1rem 1.5rem",
  };

  const liStyles = {
    wordBreak: "break-all",
  };

  return (
    <Modal show={show} onHide={handleClose} centered size="md">
      <Modal.Body
        className="bg-white"
        style={{ borderRadius: "0.5rem", padding: "2rem" }}
      >
        {messages && messages.length ? (
          <>
            <p style={pStyles} className="d-flex align-items-center">
              <i className="fa fa-times fa-2x mr-1" aria-hidden="true" />
              If you press continue things associated with the following errors
              will be removed !!!
            </p>
            <ul style={ulStyles}>
              {messages.map((m, i) => (
                <li key={m + i} style={liStyles}>
                  {m.text.replace(" !!!", ".")}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <p
            className="mb-3 mt-1 d-flex justify-content-center align-items-center"
            style={pStyles}
          >
            <i
              className={`fa ${
                isDanger ? "fa-times" : "fa-info-circle"
              } fa-2x mr-1`}
              aria-hidden="true"
            />{" "}
            {message}
          </p>
        )}
        <div className="d-flex justify-content-between">
          <button
            className="react-confirmation-modal-cancel-button"
            style={{
              ...cancelButtonStyles,
              color: primaryColor,
              borderColor: primaryColor,
            }}
            onClick={() => handleClose(false)}
          >
            Cancel
          </button>
          <button
            className="react-confirmation-modal-continue-button"
            style={{
              ...continueButtonStyles,
              color: whiteColor,
              backgroundColor: primaryColor,
            }}
            onClick={() => handleClose(true)}
          >
            Continue
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConfirmationModal;

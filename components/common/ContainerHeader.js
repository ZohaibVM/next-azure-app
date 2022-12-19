import { useRouter } from "next/router";
import { useState } from "react";
import useTheme from "../../hooks/useTheme";
import ConfirmationModal from "./../../shared/ConfirmationModal";

const ContainerHeader = ({
  form,
  sections,
  isSaveLoading,
  activeSectionIndex,
  onAddSection,
  onModalOpen,
  onEmailMandatory,
  onEditSection,
  onSave,
}) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const {
    selectedTheme: {
      primaryToggleIconActive,
      primaryToggleIconDisabled,
      whiteColor,
      primaryColor,
      secondaryColor,
      tertiaryColor,
    },
  } = useTheme();
  const { push } = useRouter();

  const handleModal = async (isContinue) => {
    if (isContinue) {
      await onSave();
    }
    push("/AllForms");
    setIsConfirmationModalOpen(false);
  };

  return (
    <>
      <div className="d-flex align-items-end justify-content-between mb-1 py-0 px-3">
        <div className="d-flex flex-column">
          <div className="d-flex">
            <div
              className="toggle-container mr-1 element-icon"
              onClick={onEmailMandatory}
              style={{
                backgroundColor: form?.isEmailMendatory
                  ? primaryToggleIconActive
                  : primaryToggleIconDisabled,
              }}
            >
              <div
                className={`dialog-button ${
                  form?.isEmailMendatory ? "" : "disabled"
                }`}
                // className="dialog-button"
                style={{
                  width: "17px",
                  height: "17px",
                  backgroundColor: whiteColor,
                }}
              />
            </div>
            <div className="font-weight-bold" style={{ color: primaryColor }}>
              Make Email Mandatory
            </div>
          </div>
          <div className="mt-2" style={{ color: primaryColor }}>
            Check this if you want to send email to the user
          </div>
        </div>
        <div className="d-flex">
          <div className="ACT_next_btn mr-1">
            <button
              className="btn_color_signup btn-block round waves-effect waves-light applicaion-button-preview-button-background-color"
              id="preview"
              style={{ backgroundColor: tertiaryColor }}
              onClick={() => setIsConfirmationModalOpen(true)}
            >
              <i className="fa fa-long-arrow-left"></i> Back to Forms
            </button>
          </div>
          <div className="ACT_next_btn mr-1">
            <button
              className="btn_color_signup btn-block round waves-effect waves-light applicaion-button-preview-button-background-color"
              id="preview"
              style={{ backgroundColor: tertiaryColor }}
              onClick={() => onEditSection(false)}
            >
              Preview
            </button>
          </div>
          <div className="ACT_next_btn mr-1">
            <button
              className="btn_color_signup btn-block round waves-effect waves-light"
              id="next"
              style={{ backgroundColor: secondaryColor }}
              onClick={onAddSection}
            >
              Create New Section
            </button>
          </div>
          <div className="ACT_next_btn">
            <button
              disabled={isSaveLoading}
              className="btn_color_signup btn-block round waves-effect waves-light applicaion-button-save-button-background-color"
              style={{ backgroundColor: primaryColor }}
              onClick={onSave}
            >
              Save {isSaveLoading && <i className="fa fa-spinner fa-spin"></i>}
            </button>
          </div>
          <div className="ACT_next_btn ml-1">
            {sections.length > 1 && activeSectionIndex > 0 && (
              <button
                className="btn_color_signup btn-block round waves-effect waves-light application-form-delete-section-button"
                id="preview"
                onClick={onModalOpen}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
      <ConfirmationModal
        message="Do you want to save current form? Click 'Continue'"
        show={isConfirmationModalOpen}
        onModalClick={handleModal}
      />
    </>
  );
};

export default ContainerHeader;

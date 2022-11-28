import useTheme from "../../hooks/useTheme";

const ContainerHeader = ({
  sections,
  isSaveLoading,
  activeSectionIndex,
  onAddSection,
  onModalOpen,
  onEditSection,
  onSave,
}) => {
  const {
    selectedTheme: {
      toggleIconColor,
      whiteColor,
      primaryColor,
      secondaryColor,
      tertiaryColor,
    },
  } = useTheme();
  return (
    <div className="d-flex align-items-end justify-content-between mb-1 py-0 px-3">
      <div className="d-flex flex-column">
        <div className="d-flex">
          <div
            className="toggle-container mr-1 element-icon"
            style={{ backgroundColor: toggleIconColor }}
          >
            <div
              //   className={`dialog-button ${
              //     !isEmailMandatory ? "disabled" : ""
              //   }`}
              className="dialog-button disabled"
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
  );
};

export default ContainerHeader;

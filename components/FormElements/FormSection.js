import useTheme from "../../hooks/useTheme";

const FormSection = ({ sectionData }) => {
  const {
    selectedTheme: { whiteColor, primaryColor, fontColor },
  } = useTheme();

  return (
    <div className="af_h_box m-0">
      <div className="af_h_title_box">
        <div
          className="af-t-primary"
          style={{
            background: primaryColor,
            color: whiteColor,
          }}
        >
          <div
            className="r_cI_titlebox_txt"
            contentEditable
            // onInput={handleContentEditableChange}
            id="section"
            // uniqueIdentifier={uniqueIdentifier}
            dataToggle="tooltip"
            title="This text is editable"
          >
            {sectionData?.sectionTitle}
          </div>
        </div>
      </div>
      <div className="af_h_title_box_text custom-card-body-padding">
        <div className="form-label-group">
          <input
            type="text"
            //   value={value}
            //   onChange={handleInputChange}
            className="form-control"
            placeholder="Please Enter Description here..."
            name="Title"
            style={{ color: fontColor }}
          />
        </div>
      </div>
    </div>
  );
};

export default FormSection;

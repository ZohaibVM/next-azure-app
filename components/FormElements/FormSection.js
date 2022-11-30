import useTheme from "../../hooks/useTheme";

const FormSection = ({ sectionData, onTitleChange, onDescriptionChange }) => {
  const {
    selectedTheme: { whiteColor, primaryColor, fontColor },
  } = useTheme();

  // console.log(sectionData);

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
          <input
            className="r_cI_titlebox_txt"
            id="section"
            style={{
              color: whiteColor,
            }}
            title="This text is editable"
            value={sectionData?.sectionTitle}
            onChange={(e) => onTitleChange(e, sectionData)}
          />
          {/* <div
            className="r_cI_titlebox_txt"
            contentEditable
            onInput={(e) => onTitleChange(e, sectionData)}
            id="section"
            // uniqueIdentifier={uniqueIdentifier}
            dataToggle="tooltip"
            title="This text is editable"
          >
            {sectionData?.sectionTitle}
          </div> */}
        </div>
      </div>
      <div className="af_h_title_box_text custom-card-body-padding">
        <div className="form-label-group">
          <input
            type="text"
            name="Title"
            id="section"
            className="form-control"
            style={{ color: fontColor }}
            onChange={(e) => onDescriptionChange(e, sectionData)}
            value={sectionData?.sectionDescription}
            placeholder="Please Enter Description here..."
          />
        </div>
      </div>
    </div>
  );
};

export default FormSection;

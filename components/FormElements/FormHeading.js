import useTheme from "../../hooks/useTheme";

const FormHeading = ({ data, onElementDelete }) => {
  const {
    selectedTheme: { whiteColor, primaryColor, fontColor },
  } = useTheme();
  return (
    <div
      className="af_h_box"
      //   id={uniqueIdentifier}
    >
      <div className="af_h_title_box">
        <div
          className="af-t-primary"
          style={{
            backgroundColor: primaryColor,
            color: whiteColor,
          }}
        >
          <div className="r_cI_titlebox_txt d-flex">
            {/* <DragHandle /> */}
            <div
              id="element"
              contentEditable
              // onInput={handleContentEditableChange}
              // uniqueIdentifier={uniqueIdentifier}
              className="react-application-form-section-element-heading"
              dataToggle="tooltip"
              title="This text is editable"
            >
              {data?.elementTitle}
            </div>
          </div>
          <div className="float-right">
            <span
              className="cursor-pointer element-icon"
              onClick={(e) => onElementDelete(e, data)}
              id="remove-icon"
            >
              <i className="fa fa-trash-o"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="af_h_title_box_text custom-card-body-padding">
        <div className="custom-input-wrappper-application-form">
          <input
            type="text"
            // value={value}
            // onChange={handleInputChange}
            className="form-control"
            placeholder="Please Enter Description here..."
            style={{ color: fontColor }}
          />
        </div>
      </div>
    </div>
  );
};

export default FormHeading;

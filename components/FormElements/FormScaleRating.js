import useTheme from "../../hooks/useTheme";

const FormScaleRating = ({ data, onElementDelete }) => {
  const {
    selectedTheme: {
      formBgImg,
      toggleIconColor,
      pageBgColor,
      pageBgImg,
      textColor,
      whiteColor,
      formBgColor,
      primaryColor,
      secondaryColor,
      tertiaryColor,
      formWidth,
      fontColor,
      inputStyle,
      labelAlignment,
    },
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
            color: whiteColor,
            backgroundColor: primaryColor,
          }}
        >
          <div className="r_cI_titlebox_txt d-flex">
            {/* <DragHandle /> */}
            <div
              contentEditable
              // onInput={handleContentEditableChange}
              id="element"
              // uniqueIdentifier={uniqueIdentifier}
              dataToggle="tooltip"
              title="This text is editable"
            >
              {data?.elementTitle}
            </div>
          </div>
          <div className="r_cI_titlebox_right_icon d-flex">
            <div
              className="toggle-container mr-1 element-icon"
              // onClick={handleIconsClick}
              id={`required-toggle-icon`}
              dataToggle="tooltip"
              title="Mark/Un Mark element as required"
              style={{ backgroundColor: whiteColor }}
            >
              <div
                className="dialog-button"
                //   className={`dialog-button ${
                //     element.uniqueIdentifier === uniqueIdentifier &&
                //     element.required
                //       ? ""
                //       : "disabled"
                //   }`}
                style={{ backgroundColor: toggleIconColor }}
              />
            </div>
            <span
              className="cursor-pointer element-icon"
              // onClick={handleIconsClick}
              id="visibility-icon"
              dataToggle="tooltip"
              title="Toggle visibilty of element"
            >
              <i
                className="text-white feather icon-eye"
                //   className={`text-white feather ${
                //     element.uniqueIdentifier === uniqueIdentifier &&
                //     element.visible
                //       ? "icon-eye"
                //       : "icon-eye-off"
                //   }`}
              ></i>
            </span>
            <span
              className="mx-1 cursor-pointer element-icon"
              // onClick={handleIconsClick}
              id="duplicate-icon"
              dataToggle="tooltip"
              title="Duplicate element"
            >
              <i className="feather icon-copy"></i>
            </span>
            <span
              className="cursor-pointer element-icon"
              onClick={(e) => onElementDelete(e, data)}
              id="remove-icon"
              dataToggle="tooltip"
              title="Delete element"
            >
              <i className="fa fa-trash-o"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="af_h_title_box_text custom-card-body-padding addrees_box_drag">
        <div className="custom-input-wrappper-application-form">
          <div style={{ color: fontColor }} className="expanding-search-title">
            SCALE RATING
            <span
              style={{
                backgroundColor: secondaryColor,
                color: whiteColor,
              }}
            >
              *
            </span>
          </div>
          <input
            type="text"
            //   value={value}
            //   onChange={handleInputChange}
            className="form-control"
            placeholder="Please Enter Description here..."
            style={{ color: fontColor }}
          />
          <div className="af_h_SR_box_list mt-2">
            <span>Worst</span>
            <div className="SR_box_number">
              <ul>
                <li>
                  <div style={{ color: primaryColor }} className="SR_number__">
                    1
                  </div>
                  <div
                    style={{ borderColor: primaryColor }}
                    className="SR_rounded__"
                  ></div>
                </li>
                <li>
                  <div style={{ color: primaryColor }} className="SR_number__">
                    2
                  </div>
                  <div
                    style={{ borderColor: primaryColor }}
                    className="SR_rounded__"
                  ></div>
                </li>
                <li>
                  <div style={{ color: primaryColor }} className="SR_number__">
                    3
                  </div>
                  <div
                    style={{ borderColor: primaryColor }}
                    className="SR_rounded__"
                  ></div>
                </li>
                <li>
                  <div style={{ color: primaryColor }} className="SR_number__">
                    4
                  </div>
                  <div
                    style={{ borderColor: primaryColor }}
                    className="SR_rounded__"
                  ></div>
                </li>
                <li>
                  <div style={{ color: primaryColor }} className="SR_number__">
                    5
                  </div>
                  <div
                    style={{ borderColor: primaryColor }}
                    className="SR_rounded__"
                  ></div>
                </li>
              </ul>
            </div>
            <span>Best</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormScaleRating;

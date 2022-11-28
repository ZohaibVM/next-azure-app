import useTheme from "../../hooks/useTheme";

const FormMultiChoice = ({ data, onElementDelete }) => {
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
              //   onInput={handleContentEditableChange}
              id="element"
              //   uniqueIdentifier={uniqueIdentifier}
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
          {/* {!element.isTemplateElement && (
                   <CardIcons
                   handleClickedElement={handleIconsClick}
                   name="Multiple Choice"
                   uniqueIdentifier={uniqueIdentifier}
                   editMode={editMode}
                   />
               )} */}
        </div>
      </div>
      <div className="af_h_title_box_text custom-card-body-padding dropdown_box_drag">
        <div className="custom-input-wrappper-application-form">
          <div style={{ color: fontColor }} className="expanding-search-title">
            Question
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
            // value={value}
            // onChange={handleInputChange}
            className="form-control"
            placeholder="Please Enter Question Here..."
            style={{ color: fontColor }}
          />
        </div>
        <div className="af_h_dd_box_list af_h_SCQ af_h_MCQ custom-options-wrappper-application-form">
          {/* {[0,1].map((v) => (
                       <Input
                       index={v}
                       key={v + 1}
                       uniqueIdentifier={uniqueIdentifier}
                       orignalElementKeyForInput={orignalElementKeyForInput}
                       isNew={persistentIsNew}
                       handleOptionsChange={handleOptionsChange}
                       editMode={editMode}
                       />
                   ))} */}
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3 float-right"
          id="custom-application-form-element-button"
          //   onClick={handleAddOptionClick}
          style={{
            backgroundColor: primaryColor,
            borderColor: primaryColor,
          }}
        >
          ADD OPTION
        </button>
      </div>
    </div>
  );
};

export default FormMultiChoice;

import useTheme from "../../hooks/useTheme";
import FormInput from "./../../shared/FormInput";

const FormPhoneNumber = ({ data, onElementDelete }) => {
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
                       name="Full Name"
                       uniqueIdentifier={uniqueIdentifier}
                       editMode={editMode}
                       isPrimary={isPrimary}
                       />
                   )} */}
        </div>
      </div>
      <div className="af_h_title_box_text custom-card-body-padding">
        {/* {!element.isTemplateElement && ( */}
        <div className="d-flex justify-content-end">
          <div
            className="font-weight-bold"
            style={{
              color: primaryColor,
            }}
          >
            Primary
          </div>
          <div
            className="toggle-container ml-1 element-icon"
            //   onClick={handleIsPrimaryClick}
            style={{ backgroundColor: primaryColor }}
          >
            <div
              // className={`dialog-button ${!isPrimary ? "disabled" : ""}`}
              className="dialog-button disabled"
              style={{
                width: "17px",
                height: "17px",
                backgroundColor: whiteColor,
              }}
            />
          </div>
        </div>

        {/* )} */}
        <div className="row">
          <div className="col-12 mt-zero-point-5 mb-1">
            <input
              type="text"
              className="form-control"
              placeholder="Please Enter Description Here..."
              //   value={value}
              //   onChange={handleInputChange}
              style={{ color: fontColor }}
            />
          </div>
          <div className="col-6">
            <FormInput
              value=""
              disabled
              type="text"
              formStyle={inputStyle}
              className="form-textbox"
              labelAlign={labelAlignment}
              placeholder="Area Code *"
            />
          </div>
          <div className="col-6">
            <FormInput
              value=""
              disabled
              type="text"
              formStyle={inputStyle}
              className="form-textbox"
              labelAlign={labelAlignment}
              placeholder="Phone Number *"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormPhoneNumber;

import useTheme from "../../hooks/useTheme";
import FormInput from "./../../shared/FormInput";
import FormIcons from "./FormIcons";
import DragHandle from "./../common/DragHandle";

const FormPhoneNumber = ({
  data,
  onElementDelete,
  onElementTitleChange,
  onElementDescriptionChange,
  onElementClone,
  onElementPrimary,
  onElementRequired,
  onElementVisible,
}) => {
  const {
    selectedTheme: {
      whiteColor,
      primaryColor,
      fontColor,
      inputStyle,
      labelAlignment,
      primaryToggleIconActive,
      primaryToggleIconDisabled,
    },
  } = useTheme();

  return (
    <div className="af_h_box">
      <div className="af_h_title_box">
        <div
          className="af-t-primary"
          style={{
            color: whiteColor,
            backgroundColor: primaryColor,
          }}
        >
          <div className="r_cI_titlebox_txt d-flex">
            <DragHandle />
            <input
              title="This text is editable"
              className="react-application-form-section-element-heading"
              style={{ color: whiteColor }}
              id={`form-title-${data?.id}`}
              value={data?.elementTitle}
              onChange={(e) => onElementTitleChange(e, data)}
            />
            {/* <div
              contentEditable
              //   onInput={handleContentEditableChange}
              id="element"
              //   uniqueIdentifier={uniqueIdentifier}
              dataToggle="tooltip"
              title="This text is editable"
            >
              {data?.elementTitle}
            </div> */}
          </div>
          <FormIcons
            data={data}
            onElementDelete={onElementDelete}
            onElementClone={onElementClone}
            onElementPrimary={onElementPrimary}
            onElementRequired={onElementRequired}
            onElementVisible={onElementVisible}
          />
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
            onClick={() => onElementPrimary(data)}
            // style={{ backgroundColor: primaryColor }}
            style={{
              backgroundColor: data?.isPrimary
                ? primaryToggleIconActive
                : primaryToggleIconDisabled,
            }}
          >
            <div
              className={`dialog-button ${!data?.isPrimary ? "disabled" : ""}`}
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
              id={`form-desc-${data?.id}`}
              style={{ color: fontColor }}
              placeholder="Please Enter Description here..."
              value={data?.elementDescription}
              onChange={(e) => onElementDescriptionChange(e, data)}
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

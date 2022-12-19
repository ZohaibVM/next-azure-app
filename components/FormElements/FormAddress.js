import useTheme from "../../hooks/useTheme";
import DragHandle from "../common/DragHandle";
import FormInput from "./../../shared/FormInput";
import FormIcons from "./FormIcons";

const FormAddress = ({
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
            backgroundColor: primaryColor,
            color: whiteColor,
          }}
        >
          <div className="r_cI_titlebox_txt d-flex align-items-center">
            <DragHandle />
            <input
              title="This text is editable"
              className="react-application-form-section-element-heading"
              style={{ color: whiteColor }}
              id={`form-title-${data?.id}`}
              value={data?.elementTitle}
              onChange={(e) => onElementTitleChange(e, data)}
            />
          </div>

          <FormIcons
            data={data}
            onElementDelete={onElementDelete}
            onElementClone={onElementClone}
            onElementPrimary={onElementPrimary}
            onElementRequired={onElementRequired}
            onElementVisible={onElementVisible}
          />
        </div>
      </div>
      <div className="af_h_title_box_text custom-card-body-padding addrees_box_drag email_box_drag">
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
              // className="dialog-button disabled"
              style={{
                width: "17px",
                height: "17px",
                backgroundColor: whiteColor,
              }}
            />
          </div>
        </div>
        {/*  )} */}
        <div className="row">
          <div className="col-12 mt-zero-point-5 mb-1">
            <input
              type="text"
              className="form-control"
              style={{ color: fontColor }}
              id={`form-desc-${data?.id}`}
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
              placeholder="Street Address *"
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
              placeholder="Street Address 2"
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
              placeholder="City *"
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
              placeholder="State/Province *"
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
              placeholder="Postal/Zip Code *"
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
              placeholder="Country *"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormAddress;

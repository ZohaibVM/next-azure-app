import FormInput from "../../shared/FormInput";
import useTheme from "../../hooks/useTheme";

const PreviewForm = ({ sections, onEditSection }) => {
  const {
    selectedTheme: {
      primaryColor,
      whiteColor,
      fontColor,
      inputStyle,
      labelAlignment,
    },
  } = useTheme();

  const getElementView = (element) => {
    switch (element.elementType) {
      case "heading":
        return (
          <div className="row" key={element.id}>
            <div className="col-12">
              <label
                className="vm_section_heading vm_dark_label m-0"
                style={{ color: fontColor }}
              >
                {element?.elementTitle}
                <small className="vm-formheading-sm d-block">
                  {element?.elementDescription}
                </small>
              </label>
            </div>
          </div>
        );
      case "address":
        return (
          <div className="af_h_box vm_af_h_box" key={element.id}>
            <div className="vm_af_h_title_box_text">
              <div className="row">
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color: fontColor,
                    }}
                  >
                    {element?.elementTitle}
                    {(element?.isRequired || element?.isPrimary) && (
                      <span className="">*</span>
                    )}
                  </label>
                  <span
                    className="vm_description d-block"
                    style={{ color: fontColor }}
                  >
                    {element?.elementDescription}
                  </span>
                </div>
                <div className="col-6">
                  <FormInput
                    value=""
                    disabled
                    type="text"
                    formStyle={inputStyle}
                    className="form-textbox"
                    labelAlign={labelAlignment}
                    placeholder="Address Line 1 *"
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
                    placeholder="Address Line 2"
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
                    placeholder="State *"
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
                <div className="col-6">
                  <FormInput
                    value=""
                    disabled
                    type="text"
                    formStyle={inputStyle}
                    className="form-textbox"
                    labelAlign={labelAlignment}
                    placeholder="Zipcode *"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "multiple choice":
        const multiChoiceOptions = element?.fields?.[0]?.options?.map(
          (option) => option?.title
        );
        return (
          <div className="af_h_box vm_af_h_box" key={element.id}>
            <div className="vm_af_h_title_box_text">
              <div className="row">
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color: fontColor,
                    }}
                  >
                    {element?.elementTitle}
                    {(element?.isRequired || element?.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element?.elementDescription}
                  </span>
                </div>
                <div className="col-6">
                  <FormInput
                    value=""
                    disabled
                    options={multiChoiceOptions}
                    type="multiple choice"
                    formStyle={inputStyle}
                    labelAlign={labelAlignment}
                    placeholder="Multi Choice *"
                  />
                </div>
                <div
                  className="vm_checkbox_container"
                  style={{ display: "grid", rowGap: "1rem" }}
                ></div>
              </div>
            </div>
          </div>
        );
      case "full name":
        return (
          <div className="af_h_box vm_af_h_box" key={element.id}>
            <div className="vm_af_h_title_box_text">
              <div className="row">
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color: fontColor,
                    }}
                  >
                    {element?.elementTitle}
                    {(element?.isRequired || element?.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description">
                    {element?.elementDescription}
                  </span>
                </div>
                <div className="col-6">
                  <FormInput
                    value=""
                    disabled
                    type="text"
                    formStyle={inputStyle}
                    className="form-textbox"
                    labelAlign={labelAlignment}
                    placeholder="Prefix"
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
                    placeholder="First Name *"
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
                    placeholder="Middle Name "
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
                    placeholder="Last Name *"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "phone number":
        return (
          <div className="af_h_box vm_af_h_box" key={element.id}>
            <div className="vm_af_h_title_box_text">
              <div className="row">
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color: fontColor,
                    }}
                  >
                    {element?.elementTitle}
                    {(element?.isRequired || element?.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element?.elementDescription}
                  </span>
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
                    placeholder="Number *"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "email address":
        return (
          <div className="af_h_box vm_af_h_box" key={element.id}>
            <div className="vm_af_h_title_box_text">
              <div className="row">
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color: fontColor,
                    }}
                  >
                    {element?.elementTitle}
                    {(element?.isRequired || element?.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element?.elementDescription}
                  </span>
                </div>
                <div className="col-6">
                  <FormInput
                    value=""
                    disabled
                    type="text"
                    formStyle={inputStyle}
                    className="form-textbox"
                    labelAlign={labelAlignment}
                    placeholder="Email Address *"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "time":
        return (
          <div className="af_h_box vm_af_h_box" key={element.id}>
            <div className="vm_af_h_title_box_text">
              <div className="row">
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      fontWeight: "bold",
                    }}
                  >
                    {element?.elementTitle}
                    {(element?.isRequired || element?.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element?.elementDescription}
                  </span>
                </div>
                <div className="col-6">
                  <FormInput
                    value=""
                    disabled
                    type="text"
                    formStyle={inputStyle}
                    className="form-textbox"
                    labelAlign={labelAlignment}
                    placeholder="HH/MM/SS *"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "date":
        return (
          <div className="af_h_box vm_af_h_box" key={element.id}>
            <div className="vm_af_h_title_box_text">
              <div className="row">
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      fontWeight: "bold",
                    }}
                  >
                    {element?.elementTitle}
                    {(element?.isRequired || element?.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element?.elementDescription}
                  </span>
                </div>
                <div className="col-6">
                  <FormInput
                    value=""
                    disabled
                    type="text"
                    formStyle={inputStyle}
                    className="form-textbox"
                    labelAlign={labelAlignment}
                    placeholder="MM/DD/YYYY *"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "long text":
        return (
          <div className="af_h_box vm_af_h_box" key={element.id}>
            <div className="vm_af_h_title_box_text">
              <div className="row">
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      fontWeight: "bold",
                    }}
                  >
                    {element?.elementTitle}
                    {(element?.isRequired || element?.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element?.elementDescription}
                  </span>
                </div>
                <div className="col-6">
                  <FormInput
                    value=""
                    disabled
                    type="textarea"
                    formStyle={inputStyle}
                    className="form-longtext"
                    labelAlign={labelAlignment}
                    placeholder="Long Text *"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "short text":
        return (
          <div className="af_h_box vm_af_h_box" key={element.id}>
            <div className="vm_af_h_title_box_text">
              <div className="row">
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      fontWeight: "bold",
                    }}
                  >
                    {element?.elementTitle}
                    {(element?.isRequired || element?.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element?.elementDescription}
                  </span>
                </div>
                <div className="col-6">
                  <FormInput
                    value=""
                    disabled
                    type="text"
                    formStyle={inputStyle}
                    className="form-textbox"
                    labelAlign={labelAlignment}
                    placeholder="Short Text *"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "integer":
        return (
          <div className="af_h_box vm_af_h_box" key={element.id}>
            <div className="vm_af_h_title_box_text">
              <div className="row">
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      fontWeight: "bold",
                    }}
                  >
                    {element?.elementTitle}
                    {(element?.isRequired || element?.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element?.elementDescription}
                  </span>
                </div>
                <div className="col-6">
                  <FormInput
                    value=""
                    disabled
                    type="text"
                    formStyle={inputStyle}
                    className="form-textbox"
                    labelAlign={labelAlignment}
                    placeholder="Integer *"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "decimal":
        return (
          <div className="af_h_box vm_af_h_box" key={element.id}>
            <div className="vm_af_h_title_box_text">
              <div className="row">
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      fontWeight: "bold",
                    }}
                  >
                    {element?.elementTitle}
                    {(element?.isRequired || element?.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element?.elementDescription}
                  </span>
                </div>
                <div className="col-6">
                  <FormInput
                    value=""
                    disabled
                    type="text"
                    formStyle={inputStyle}
                    className="form-textbox"
                    labelAlign={labelAlignment}
                    placeholder="Decimel *"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "single choice":
        const singleChoiceOptions = element?.fields?.[0]?.options?.map(
          (option) => option?.title
        );
        return (
          <div className="af_h_box vm_af_h_box" key={element.id}>
            <div className="vm_af_h_title_box_text">
              <div className="row">
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color: fontColor,
                    }}
                  >
                    {element?.elementTitle}
                    {(element?.isRequired || element?.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element?.elementDescription}
                  </span>
                </div>
                <div className="col-6">
                  <FormInput
                    value=""
                    disabled
                    type="single choice"
                    labelAlign={labelAlignment}
                    placeholder="Single Choice *"
                    options={singleChoiceOptions}
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "file upload":
        return (
          <div className="af_h_box vm_af_h_box" key={element.id}>
            <div className="vm_af_h_title_box_text">
              <div className="row">
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      fontWeight: "bold",
                    }}
                  >
                    {element?.elementTitle}
                    {(element?.isRequired || element?.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element?.elementDescription}
                  </span>
                </div>
                <div className="col-6">
                  <FormInput
                    value=""
                    disabled
                    type="upload"
                    formStyle={inputStyle}
                    className="form-upload-label"
                    labelAlign={labelAlignment}
                    placeholder="Upload *"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "dropdown":
        return (
          <div className="af_h_box vm_af_h_box" key={element.id}>
            <div className="vm_af_h_title_box_text">
              <div className="row">
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{ textTransform: "capitalize", color: fontColor }}
                  >
                    {element?.elementTitle}
                    {(element?.isRequired || element?.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element?.elementDescription}
                  </span>
                </div>
                <div className="col-6">
                  <FormInput
                    value=""
                    disabled
                    type="dropdown"
                    formStyle={inputStyle}
                    className="form-dropdown"
                    labelAlign={labelAlignment}
                    placeholder="Select Dropdown *"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case "scale rating":
        return (
          <div className="af_h_box vm_af_h_box" key={element.id}>
            <div className="vm_af_h_title_box_text">
              <div className="row">
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color: fontColor,
                    }}
                  >
                    {element?.elementTitle}
                    {(element?.isRequired || element?.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element?.elementDescription}
                  </span>
                </div>
                <div className="vm_checkbox_container">
                  {[1, 2, 3, 4, 5].map((v) => (
                    <div className="vm_rb" key={v}>
                      <input
                        type="radio"
                        name="rating"
                        value={`${v}`}
                        disabled
                      />
                      <label className="vm_dark_label">{v}</label>
                      <span style={{ borderRadius: 0 }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "signature":
        return (
          <div className="af_h_box vm_af_h_box" key={element.id}>
            <div className="vm_af_h_title_box_text">
              <div className="row">
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color: fontColor,
                    }}
                  >
                    {element?.elementTitle}
                    {(element?.isRequired || element?.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return element.name;
    }
  };

  return (
    <div className="application_form_area rev_scr_form">
      {sections?.map((section, index) => (
        <div className="af_h_title_box mb-4" key={section?.sectionId}>
          <div
            style={{
              color: whiteColor,
              backgroundColor: primaryColor,
            }}
            className="af-t-primary d-flex justify-content-between align-items-center"
          >
            <div>
              <div style={{ textTransform: "capitalize" }}>
                {section?.sectionTitle}
              </div>
              <span style={{ fontSize: 13, marginTop: 5 }}>
                {section?.sectionDescription}
              </span>
            </div>
            <span
              id={section.sectionId}
              style={{
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
                border: "1px solid",
                backgroundColor: primaryColor,
                borderColor: whiteColor,
              }}
              onClick={() => onEditSection(true, index)}
            >
              <i className="fa fa-pencil mr-zero-point-5"></i>Edit
            </span>
          </div>
          <div className="af_h_title_box_text">
            {section?.elements.map((element) => getElementView(element))}
          </div>
        </div>
      ))}
      <div className="af_h_title_box d-flex justify-content-center">
        {/* <div
          className="btn-left-container ACT_next_btn mr-0"
          style={{ width: "100px" }}
        >
          <button
            className="btn_color_signup btn-outline-primary btn-block round mb-2 waves-effect waves-light"
            id="submit"
            style={{
              margin: 0,
              fontWeight: "600",
              fontSize: "15px",
              padding: "0 12px",
              height: "40px",
              backgroundColor: primaryColor,
              borderColor: primaryColor,
            }}
          >
            Submit
          </button>
        </div> */}
        <button type="submit" className="form-submit-btn" disabled>
          Submit
        </button>
      </div>
    </div>
  );
};

export default PreviewForm;

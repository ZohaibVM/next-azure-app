import React from "react";
import axios from "axios";
import useTheme from "../hooks/useTheme";
import FormInput from "../shared/FormInput";

const ReviewPage = ({
  sections,
  handleEditSectionClick,
  persistentSections,
  activeStep,
}) => {
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
          <div className="row">
            <div className="col-12">
              <label
                className="vm_section_heading vm_dark_label m-0"
                style={{ color: fontColor }}
              >
                {element.name}
                <small className="vm-formheading-sm d-block">
                  {element.value}
                </small>
              </label>
            </div>
          </div>
        );
      case "address":
        return (
          <div className="af_h_box vm_af_h_box">
            <div className="vm_af_h_title_box_text">
              <div className="row">
                {/* <div className="vm_form-label-group col-12">
                  <label
                    className="vm_dark_label_heading"
                    style={{ textTransform: "capitalize", color: fontColor }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
                  </span>
                </div> */}
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color: fontColor,
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="">*</span>
                    )}
                  </label>
                  <span
                    className="vm_description d-block"
                    style={{ color: fontColor }}
                  >
                    {element.value}
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
                {/* <div
                  className="pos-relative vm_form-label-group-m col-5"
                  style={inputStyles}
                >
                  <label className="vm_dark_label" style={{ color: fontColor }}>
                    Address Line 1 <span className="in_star_lg">*</span>
                  </label>
                  <span
                    style={{
                      borderColor: primaryColor,
                      background: inputBgColor,
                    }}
                    className={getBorderStyles()}
                  ></span>
                </div>
                <div className="col-1" />
                <div
                  className="pos-relative vm_form-label-group-m col-6"
                  style={inputStyles}
                >
                  <label className="vm_dark_label" style={{ color: fontColor }}>
                    Address Line 2
                  </label>
                  <span
                    style={{
                      borderColor: primaryColor,
                      background: inputBgColor,
                    }}
                    className={getBorderStyles()}
                  ></span>
                </div>
                <div
                  className="pos-relative vm_form-label-group-m col-5"
                  style={inputStyles}
                >
                  <label className="vm_dark_label" style={{ color: fontColor }}>
                    City <span className="in_star_lg">*</span>
                  </label>
                  <span
                    style={{
                      borderColor: primaryColor,
                      background: inputBgColor,
                    }}
                    className={getBorderStyles()}
                  ></span>
                </div>
                <div className="col-1" />
                <div
                  className="pos-relative vm_form-label-group-m col-6"
                  style={inputStyles}
                >
                  <label className="vm_dark_label" style={{ color: fontColor }}>
                    State <span className="in_star_lg">*</span>
                  </label>
                  <span
                    style={{
                      borderColor: primaryColor,
                      background: inputBgColor,
                    }}
                    className={getBorderStyles()}
                  ></span>
                </div>
                <div
                  className="pos-relative vm_form-label-group-m col-5"
                  style={inputStyles}
                >
                  <label className="vm_dark_label" style={{ color: fontColor }}>
                    Country <span className="in_star_lg">*</span>
                  </label>
                  <span
                    style={{
                      borderColor: primaryColor,
                      background: inputBgColor,
                    }}
                    className={getBorderStyles()}
                  ></span>
                </div>
                <div className="col-1" />
                <div
                  className="pos-relative vm_form-label-group-m col-6"
                  style={inputStyles}
                >
                  <label className="vm_dark_label" style={{ color: fontColor }}>
                    Zip Code <span className="in_star_lg">*</span>
                  </label>
                  <span
                    style={{
                      borderColor: primaryColor,
                      background: inputBgColor,
                    }}
                    className={getBorderStyles()}
                  ></span>
                </div> */}
              </div>
            </div>
          </div>
        );
      case "multiple choice":
        const options = [];
        for (const property in element.options) {
          options.push(element.options[property]);
        }
        return (
          <div className="af_h_box vm_af_h_box">
            <div className="vm_af_h_title_box_text">
              <div className="row">
                {/* <div className="vm_form-label-group col-12">
                  <label
                    className="vm_dark_label_heading"
                    style={{ textTransform: "capitalize", color: fontColor }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
                  </span>
                </div> */}
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color: fontColor,
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
                  </span>
                </div>
                <div className="col-6">
                  <FormInput
                    value=""
                    disabled
                    type="multiple choice"
                    formStyle={inputStyle}
                    // className="form-textbox"
                    labelAlign={labelAlignment}
                    placeholder="Multi Choice *"
                    options={options}
                  />
                  {/* <div className="form-choice-wrapper">
                    {options.map((option) => (
                      <div key={option} className="form-choice-row">
                        <input
                          type="checkbox"
                          className="form-choice"
                          name="multichoice"
                          value={option}
                          disabled
                          // checked={option.checked}
                          // onChange={(e) => handleChange(e, index)}
                        />
                        <label htmlFor="">{option}</label>
                      </div>
                    ))}
                  </div> */}
                </div>
                <div
                  className="vm_checkbox_container"
                  style={{ display: "grid", rowGap: "1rem" }}
                >
                  {/* {options.map((v) => (
                    <div className="vm_rb">
                      <input
                        type="radio"
                        name="rating"
                        value={`${v}`}
                        disabled
                      />
                      <label
                        className="vm_dark_label"
                        style={{ color: fontColor }}
                      >
                        {v}
                      </label>
                      <span style={{ borderRadius: 0 }} />
                    </div>
                  ))} */}
                </div>
              </div>
            </div>
          </div>
        );
      case "full name":
        return (
          <div className="af_h_box vm_af_h_box">
            <div className="vm_af_h_title_box_text">
              <div className="row">
                {/* <div className="vm_form-label-group col-12">
                  <label
                    className="vm_dark_label_heading"
                    style={{ textTransform: "capitalize", color: fontColor }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description">{element.value}</span>
                </div> */}
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color: fontColor,
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description">{element.value}</span>
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
                {/* <div
                  className="pos-relative vm_form-label-group-m col-5"
                  style={inputStyles}
                >
                  <label className="vm_dark_label" style={{ color: fontColor }}>
                    Prefix
                  </label>
                  <span
                    style={{
                      borderColor: primaryColor,
                      background: inputBgColor,
                    }}
                    className={getBorderStyles()}
                  ></span>
                  <i
                    className="fa fa-chevron-down"
                    style={{
                      float: "right",
                      marginTop: "10px",
                      color: secondaryColor,
                    }}
                  ></i>
                </div>
                <div className="col-1" />
                <div
                  className="pos-relative vm_form-label-group-m col-6"
                  style={inputStyles}
                >
                  <label className="vm_dark_label" style={{ color: fontColor }}>
                    First Name <span className="in_star_lg">*</span>
                  </label>
                  <span
                    style={{
                      borderColor: primaryColor,
                      background: inputBgColor,
                    }}
                    className={getBorderStyles()}
                  ></span>
                </div>
                <div
                  className="pos-relative vm_form-label-group-m col-5"
                  style={inputStyles}
                >
                  <label className="vm_dark_label" style={{ color: fontColor }}>
                    Middle Name
                  </label>
                  <span
                    style={{
                      borderColor: primaryColor,
                      background: inputBgColor,
                    }}
                    className={getBorderStyles()}
                  ></span>
                </div>
                <div className="col-1" />
                <div
                  className="pos-relative vm_form-label-group-m col-6"
                  style={inputStyles}
                >
                  <label className="vm_dark_label" style={{ color: fontColor }}>
                    Last Name <span className="in_star_lg">*</span>
                  </label>
                  <span
                    style={{
                      borderColor: primaryColor,
                      background: inputBgColor,
                    }}
                    className={getBorderStyles()}
                  ></span>
                </div> */}
              </div>
            </div>
          </div>
        );
      case "phone number":
        return (
          <div className="af_h_box vm_af_h_box">
            <div className="vm_af_h_title_box_text">
              <div className="row">
                {/* <div className="vm_form-label-group col-12">
                  <label
                    className="vm_dark_label_heading"
                    style={{ textTransform: "capitalize", color: fontColor }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
                  </span>
                </div> */}
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color: fontColor,
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
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
                {/* <div
                  className="pos-relative vm_form-label-group col-5"
                  style={inputStyles}
                >
                  <label
                    className="vm_dark_label"
                    style={{
                      // position: "static",
                      margin: 0,
                      padding: "10px 0",
                      color: fontColor,
                      zIndex: 5,
                      left: "15px",
                      top: 0,
                    }}
                  >
                    Area Code <span className="in_star_lg">*</span>
                  </label>
                  <span
                    style={{
                      borderColor: primaryColor,
                      background: inputBgColor,
                    }}
                    className={getBorderStyles()}
                  ></span>
                </div>
                <div
                  className="pos-relative vm_form-label-group col-6"
                  style={{ ...inputStyles, marginLeft: "20px" }}
                >
                  <label
                    className="vm_dark_label"
                    style={{
                      position: "relative",
                      margin: 0,
                      padding: "10px 0",
                      color: fontColor,
                      zIndex: 5,
                      top: 0,
                    }}
                  >
                    Number <span className="in_star_lg">*</span>
                  </label>
                  <span
                    style={{
                      borderColor: primaryColor,
                      background: inputBgColor,
                    }}
                    className={getBorderStyles()}
                  ></span>
                </div> */}
              </div>
            </div>
          </div>
        );
      case "email address":
        return (
          <div className="af_h_box vm_af_h_box">
            <div className="vm_af_h_title_box_text">
              <div className="row">
                {/* <div className="vm_form-label-group col-12">
                  <label
                    className="vm_dark_label_heading"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      top: "25px",
                      marginLeft: "15px",
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
                  </span>
                </div> */}
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color: fontColor,
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
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
                {/* <div
                  className="pos-relative vm_form-label-group col-6"
                  style={{
                    ...inputStyles,
                    marginTop: "10px",
                    marginLeft: "10px",
                    paddingTop: "45px",
                  }}
                >
                  <span
                    style={{
                      borderColor: primaryColor,
                      background: inputBgColor,
                    }}
                    className={getBorderStyles()}
                  ></span>
                </div> */}
              </div>
            </div>
          </div>
        );
      case "time":
        return (
          <div className="af_h_box vm_af_h_box">
            <div className="vm_af_h_title_box_text">
              <div className="row">
                {/* <div className="vm_form-label-group col-12">
                  <label
                    className="vm_dark_label_heading"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      top: "25px",
                      marginLeft: "15px",
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
                  </span>
                </div> */}
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      fontWeight: "bold",
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
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
                {/* <div
                  className="pos-relative vm_form-label-group col-6"
                  style={{
                    ...inputStyles,
                    marginTop: "10px",
                    marginLeft: "10px",
                    padding: "15px",
                  }}
                >
                  <span
                    style={{
                      borderColor: primaryColor,
                      background: inputBgColor,
                    }}
                    className={getBorderStyles()}
                  ></span>
                  <i
                    className="feather icon-clock"
                    style={{
                      float: "right",
                      color: "#fb0874",
                      // marginBottom: "0.5rem",
                    }}
                  />
                </div> */}
              </div>
            </div>
          </div>
        );
      case "date":
        return (
          <div className="af_h_box vm_af_h_box">
            <div className="vm_af_h_title_box_text">
              <div className="row">
                {/* <div className="vm_form-label-group col-12">
                  <label
                    className="vm_dark_label_heading"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      top: "25px",
                      marginLeft: "15px",
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>

                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
                  </span>
                </div> */}
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      fontWeight: "bold",
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>

                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
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
                {/* <div
                  className="pos-relative vm_form-label-group col-6"
                  style={{
                    ...inputStyles,
                    marginTop: "10px",
                    marginLeft: "10px",
                    padding: "15px",
                  }}
                >
                  <i
                    className="feather icon-calendar"
                    style={{
                      float: "right",
                      // marginBottom: "0.5rem",
                      color: "#fb0874",
                    }}
                  />
                  <span
                    style={{
                      borderColor: primaryColor,
                      background: inputBgColor,
                    }}
                    className={getBorderStyles()}
                  ></span>
                </div> */}
              </div>
            </div>
          </div>
        );
      case "long text":
        return (
          <div className="af_h_box vm_af_h_box">
            <div className="vm_af_h_title_box_text">
              <div className="row">
                {/* <div className="vm_form-label-group col-12">
                  <label
                    className="vm_dark_label_heading"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      top: "25px",
                      marginLeft: "15px",
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
                  </span>
                </div> */}
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      fontWeight: "bold",
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
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
                {/* <div
                  className="pos-relative vm_form-label-group col-6"
                  style={{
                    ...inputStyles,
                    marginTop: "10px",
                    marginLeft: "10px",
                    padding: "24px",
                  }}
                >
                  <span
                    style={{
                      borderColor: primaryColor,
                      background: inputBgColor,
                    }}
                    className={getBorderStyles()}
                  ></span>
                </div> */}
              </div>
            </div>
          </div>
        );
      case "short text":
        return (
          <div className="af_h_box vm_af_h_box">
            <div className="vm_af_h_title_box_text">
              <div className="row">
                {/* <div className="vm_form-label-group col-12">
                  <label
                    className="vm_dark_label_heading"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      top: "25px",
                      marginLeft: "15px",
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
                  </span>
                </div> */}
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      fontWeight: "bold",
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
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
                {/* <div
                  className="vm_form-label-group col-6"
                  style={{
                    ...inputStyles,
                    marginTop: "10px",
                    marginLeft: "10px",
                    padding: "24px",
                  }}
                >
                  <span
                    style={{
                      borderColor: primaryColor,
                      background: inputBgColor,
                    }}
                    className={getBorderStyles()}
                  ></span>
                </div> */}
              </div>
            </div>
          </div>
        );
      case "integer":
        return (
          <div className="af_h_box vm_af_h_box">
            <div className="vm_af_h_title_box_text">
              <div className="row">
                {/* <div className="vm_form-label-group col-12">
                  <label
                    className="vm_dark_label_heading"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      top: "25px",
                      marginLeft: "15px",
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
                  </span>
                </div> */}
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      fontWeight: "bold",
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
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
                {/* <div
                  className="pos-relative vm_form-label-group col-6"
                  style={{
                    ...inputStyles,
                    marginTop: "10px",
                    marginLeft: "10px",
                    padding: "24px",
                  }}
                >
                  <span
                    style={{
                      borderColor: primaryColor,
                      background: inputBgColor,
                    }}
                    className={getBorderStyles()}
                  ></span>
                </div> */}
              </div>
            </div>
          </div>
        );
      case "decimal":
        return (
          <div className="af_h_box vm_af_h_box">
            <div className="vm_af_h_title_box_text">
              <div className="row">
                {/* <div className="vm_form-label-group col-12">
                  <label
                    className="vm_dark_label_heading"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      top: "25px",
                      marginLeft: "15px",
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
                  </span>
                </div> */}
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      fontWeight: "bold",
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
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
                {/* <div
                  className="vm_form-label-group col-6"
                  style={{
                    ...inputStyles,
                    marginTop: "10px",
                    marginLeft: "10px",
                    padding: "24px",
                    // borderBottom: "1px solid #000",
                  }}
                >
                  <span
                    style={{
                      borderColor: primaryColor,
                      background: inputBgColor,
                    }}
                    className={getBorderStyles()}
                  ></span>
                </div> */}
              </div>
            </div>
          </div>
        );
      case "single choice":
        const singleChoiceOptions = [];
        for (const property in element.options) {
          singleChoiceOptions.push(element.options[property]);
        }
        return (
          <div className="af_h_box vm_af_h_box">
            <div className="vm_af_h_title_box_text">
              <div className="row">
                {/* <div className="vm_form-label-group col-12">
                  <label
                    className="vm_dark_label_heading"
                    style={{ textTransform: "capitalize", color: fontColor }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
                  </span>
                </div> */}
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color: fontColor,
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
                  </span>
                </div>
                <div className="col-6">
                  <FormInput
                    value=""
                    disabled
                    type="single choice"
                    // formStyle={inputStyle}
                    // className="form-textbox"
                    labelAlign={labelAlignment}
                    placeholder="Single Choice *"
                    options={singleChoiceOptions}
                  />
                </div>
                {/* <div
                  className="vm_checkbox_container"
                  style={{ display: "grid", rowGap: "1rem" }}
                >
                  {singleChoiceOptions.map((v) => (
                    <div className="vm_rb">
                      <input
                        type="radio"
                        name="rating"
                        value={`${v}`}
                        disabled
                      />
                      <label
                        className="vm_dark_label"
                        style={{ color: fontColor }}
                      >
                        {v}
                      </label>
                      <span />
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          </div>
        );
      case "file upload":
        return (
          <div className="af_h_box vm_af_h_box">
            <div className="vm_af_h_title_box_text">
              <div className="row">
                {/* <div className="vm_form-label-group col-12">
                  <label
                    className="vm_dark_label_heading"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      top: "25px",
                      marginLeft: "15px",
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
                  </span>
                </div> */}
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      color: fontColor,
                      fontWeight: "bold",
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
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
                {/* <div
                  className="vm_form-label-group col-6"
                  style={{
                    ...inputStyles,
                    marginTop: "10px",
                    marginLeft: "10px",
                    padding: "24px",
                  }}
                >
                  <span
                    style={{
                      borderColor: primaryColor,
                      background: inputBgColor,
                    }}
                    className={getBorderStyles()}
                  ></span>
                </div> */}
              </div>
            </div>
          </div>
        );
      case "dropdown":
        return (
          <div className="af_h_box vm_af_h_box">
            <div className="vm_af_h_title_box_text">
              <div className="row">
                {/* <div className="vm_form-label-group col-12">
                  <label
                    className="vm_dark_label_heading"
                    style={{ textTransform: "capitalize", color: fontColor }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
                  </span>
                </div> */}
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{ textTransform: "capitalize", color: fontColor }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
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
                {/* <div className="vm_form-label-group-m col-6">
                  <label
                    className="vm_dark_label"
                    style={{ color: fontColor, top: "40px", left: "15px" }}
                  >
                    Select dropdown
                  </label>
                  <div
                    style={{
                      ...getDropdownStyles(),
                      marginTop: "0",
                      padding: "20px",
                    }}
                  >
                    <i
                      class="fa fa-chevron-down"
                      style={{
                        float: "right",
                        marginTop: "-4px",
                        color: secondaryColor,
                      }}
                    ></i>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        );
      case "scale rating":
        return (
          <div className="af_h_box vm_af_h_box">
            <div className="vm_af_h_title_box_text">
              <div className="row">
                {/* <div className="vm_form-label-group col-12">
                  <label
                    className="vm_dark_label_heading"
                    style={{ textTransform: "capitalize", color: fontColor }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
                  </span>
                </div> */}
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color: fontColor,
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                  <span className="vm_description" style={{ color: fontColor }}>
                    {element.value}
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
          <div className="af_h_box vm_af_h_box">
            <div className="vm_af_h_title_box_text">
              <div className="row">
                {/* <div className="vm_form-label-group col-12">
                  <label
                    className="vm_dark_label_heading"
                    style={{ textTransform: "capitalize", color: fontColor }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
                      <span className="in_star_lg">*</span>
                    )}
                  </label>
                </div> */}
                <div className="col-12">
                  <label
                    className="d-block"
                    style={{
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color: fontColor,
                    }}
                  >
                    {element.name}
                    {(element.isRequired || element.isPrimary) && (
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
      {sections.map((s, i) => (
        <div className="af_h_title_box mb-4" key={i}>
          <div
            style={{
              color: whiteColor,
              backgroundColor: primaryColor,
            }}
            className="af-t-primary d-flex justify-content-between align-items-center"
          >
            <div>
              <div style={{ textTransform: "capitalize" }}>{s.name}</div>
              <span style={{ fontSize: 13, marginTop: 5 }}>{s.value}</span>
            </div>
            <span
              id={s.uniqueIdentifier}
              style={{
                padding: "5px 10px",
                borderRadius: "5px",
                cursor: "pointer",
                border: "1px solid",
                backgroundColor: primaryColor,
                borderColor: whiteColor,
              }}
              onClick={handleEditSectionClick}
            >
              <i className="fa fa-pencil mr-zero-point-5"></i>Edit
            </span>
          </div>
          <div className="af_h_title_box_text">
            {s.elements.map((element) => getElementView(element))}
          </div>
        </div>
      ))}
      <div className={`af_h_title_box d-flex justify-content-end`}>
        <div
          className="btn-left-container ACT_next_btn mr-0"
          style={{ width: "100px" }}
        >
          <button
            className="btn_color_signup btn-outline-primary btn-block round mb-2 waves-effect waves-light"
            onClick={() => {
              const apiData = [];
              persistentSections.map((s) => {
                const elements = [];
                s.elements.map((e) => {
                  elements.push({
                    elementType: e.elementType,
                    name: e.name,
                    value: e.value,
                    isRequired: e.isRequired,
                    isVisible: e.isVisible,
                    isPrimary: e.isPrimary,
                    isTemplateElement: !!e.isTemplateElement,
                    options: e.options ? { ...e.options } : null,
                  });
                });
                apiData.push({
                  name: s.name,
                  value: s.value,
                  isEmailMandatory: s.isEmailMandatory,
                  isFirstSection: s.isFirstSection,
                  elements,
                });
              });
              axios
                .post(
                  `${window.location.origin}/ApplicationForm/Create`,
                  apiData
                )
                .then(
                  () =>
                    (window.location.href = `${window.location.origin}/ApplicationForm/index`)
                )
                .catch((error) => {
                  // removeAlert()
                  // errorAlert(error)
                  console.log("errorAlert", error);
                });
            }}
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
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;

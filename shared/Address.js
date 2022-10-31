import React, { useState } from "react";
import { sortableHandle } from "react-sortable-hoc";
import useTheme from "./../hooks/useTheme";
// import "../styles/dashboard.css";

import CardIcons from "./CardIcons";
import FormInput from "./FormInput";

let persistentState = [];
let orignalElementKey;

const Address = ({
  handleClickedElement,
  uniqueIdentifier,
  editMode,
  handleChange,
  handleIsPrimaryChange,
  handleEditableElementChange,
}) => {
  if (editMode.status) {
    if (persistentState.length) {
      if (
        !persistentState.find((pS) => pS.uniqueIdentifier === uniqueIdentifier)
      ) {
        persistentState = [
          ...persistentState,
          {
            uniqueIdentifier,
            value: editMode.value,
            isPrimary: editMode.isPrimary,
            isTemplateElement: editMode.isTemplateElement,
            elementName: editMode.name,
          },
        ];
      }
    } else {
      persistentState = [
        ...persistentState,
        {
          uniqueIdentifier,
          value: editMode.value,
          isPrimary: editMode.isPrimary,
          isTemplateElement: editMode.isTemplateElement,
          elementName: editMode.name,
        },
      ];
    }
  } else if (persistentState.length) {
    if (
      !persistentState.find((pS) => pS.uniqueIdentifier === uniqueIdentifier)
    ) {
      if (orignalElementKey) {
        const previousElementValue = persistentState.find(
          (pS) => pS.uniqueIdentifier === orignalElementKey
        ).value;
        const previousElementIsPrimary = persistentState.find(
          (pS) => pS.uniqueIdentifier === orignalElementKey
        ).isPrimary;
        const previousElementIsTemplateElement = persistentState.find(
          (pS) => pS.uniqueIdentifier === orignalElementKey
        ).isTemplateElement;
        const previousElementName = persistentState.find(
          (pS) => pS.uniqueIdentifier === orignalElementKey
        ).elementName;
        persistentState = [
          ...persistentState,
          {
            uniqueIdentifier,
            value: previousElementValue,
            isPrimary: previousElementIsPrimary,
            elementName: previousElementName,
            isTemplateElement: previousElementIsTemplateElement,
          },
        ];
        orignalElementKey = undefined;
      } else {
        persistentState = [
          ...persistentState,
          {
            uniqueIdentifier,
            value: "",
            isPrimary: false,
            elementName: "Address",
          },
        ];
      }
    }
  } else {
    persistentState = [
      ...persistentState,
      { uniqueIdentifier, value: "", isPrimary: false, elementName: "Address" },
    ];
  }

  const element = persistentState.find(
    (pS) => pS.uniqueIdentifier === uniqueIdentifier
  );

  const [value, setValue] = useState(element ? element.value : "");
  const [isPrimary, setIsPrimary] = useState(
    element ? element.isPrimary : false
  );
  const DragHandle = sortableHandle(() => (
    <span className="mr-2" style={{ cursor: "grab" }}>
      <i
        className="fa fa-bars"
        aria-hidden="true"
        style={{ fontSize: "1.2em" }}
      ></i>
    </span>
  ));

  const handleInputChange = (e) => {
    if (element) {
      element.value = e.target.value;
      persistentState = [...persistentState];
    }

    setValue(e.target.value);
    handleChange(e, uniqueIdentifier);
  };

  const handleIsPrimaryClick = () => {
    if (element) {
      element.isPrimary = !isPrimary;
    }

    setIsPrimary(!isPrimary);
    handleIsPrimaryChange(!isPrimary, uniqueIdentifier);
  };

  const handleIconsClick = (e, name, uniqueIdentifier) => {
    if (e.currentTarget.id === "duplicate-icon") {
      orignalElementKey = uniqueIdentifier;
    }
    handleClickedElement(e, name, uniqueIdentifier);
  };

  const handleContentEditableChange = (e) => {
    if (element) {
      element.elementName = e.target.innerText;
      persistentState = [...persistentState];
    }

    handleEditableElementChange(e);
  };

  const {
    selectedTheme: {
      inputStyle,
      fontColor,
      primaryColor,
      whiteColor,
      labelAlignment,
    },
  } = useTheme();

  return (
    <div className="af_h_box" id={uniqueIdentifier}>
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
            <div
              contentEditable
              onInput={handleContentEditableChange}
              id="element"
              uniqueIdentifier={uniqueIdentifier}
              dataToggle="tooltip"
              title="This text is editable"
            >
              {element.elementName}
            </div>
          </div>
          {!element.isTemplateElement && (
            <CardIcons
              handleClickedElement={handleIconsClick}
              name="Address"
              uniqueIdentifier={uniqueIdentifier}
              editMode={editMode}
              isPrimary={isPrimary}
            />
          )}
        </div>
      </div>
      <div className="af_h_title_box_text custom-card-body-padding addrees_box_drag email_box_drag">
        {!element.isTemplateElement && (
          <div className="d-flex justify-content-end">
            <div
              style={{
                fontSize: "medium",
                color: primaryColor,
                fontWeight: "bolder",
              }}
            >
              Primary
            </div>
            <div
              className="toggle-container ml-1 element-icon"
              onClick={handleIsPrimaryClick}
              style={{ backgroundColor: primaryColor }}
            >
              <div
                className={`dialog-button ${!isPrimary ? "disabled" : ""}`}
                style={{
                  width: "17px",
                  height: "17px",
                  backgroundColor: whiteColor,
                }}
              />
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-12 mt-zero-point-5 mb-1">
            <input
              type="text"
              className="form-control"
              placeholder="Please Enter Description Here..."
              value={value}
              onChange={handleInputChange}
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

          {/* <div className="col-6 mt-zero-point-5 mb-1">
            <div
              style={inputStyles}
              className="pos-relative expanding-search-title black-bottom-border"
            >
              <i>Street Address</i>
              <span
                style={{ backgroundColor: secondaryColor, color: whiteColor }}
              >
                *
              </span>
              <div
                style={{
                  borderColor: primaryColor,
                  backgroundColor: inputBgColor,
                }}
                className={getBorderStyles()}
              ></div>
            </div>
          </div> */}
          {/* <div className="col-6 mt-zero-point-5 mb-1">
            <div
              style={inputStyles}
              className="pos-relative expanding-search-title black-bottom-border"
            >
              <i>Street Address 2</i>
              <div
                style={{
                  borderColor: primaryColor,
                  backgroundColor: inputBgColor,
                }}
                className={getBorderStyles()}
              ></div>
            </div>
          </div> */}
          {/* <div className="col-6 mb-1">
            <div
              style={inputStyles}
              className="pos-relative expanding-search-title black-bottom-border"
            >
              <i>City</i>
              <span
                style={{ backgroundColor: secondaryColor, color: whiteColor }}
              >
                *
              </span>
              <div
                style={{
                  borderColor: primaryColor,
                  backgroundColor: inputBgColor,
                }}
                className={getBorderStyles()}
              ></div>
            </div>
          </div> */}
          {/* <div className="col-6 mb-1">
            <div
              style={inputStyles}
              className="pos-relative expanding-search-title black-bottom-border"
            >
              <i>State/Province</i>
              <span
                style={{ backgroundColor: secondaryColor, color: whiteColor }}
              >
                *
              </span>
              <div
                style={{
                  borderColor: primaryColor,
                  backgroundColor: inputBgColor,
                }}
                className={getBorderStyles()}
              ></div>
            </div>
          </div> */}
          {/* <div className="col-6">
            <div
              style={inputStyles}
              className="pos-relative expanding-search-title black-bottom-border"
            >
              <i>Postal/Zip Code</i>
              <span
                style={{ backgroundColor: secondaryColor, color: whiteColor }}
              >
                *
              </span>
              <div
                style={{
                  borderColor: primaryColor,
                  backgroundColor: inputBgColor,
                }}
                className={getBorderStyles()}
              ></div>
            </div>
          </div> */}
          {/* <div className="col-6">
            <div
              style={inputStyles}
              className="pos-relative expanding-search-title black-bottom-border"
            >
              <i>Country</i>
              <span
                style={{ backgroundColor: secondaryColor, color: whiteColor }}
              >
                *
              </span>
              <div
                style={{
                  borderColor: primaryColor,
                  backgroundColor: inputBgColor,
                }}
                className={getBorderStyles()}
              ></div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Address;

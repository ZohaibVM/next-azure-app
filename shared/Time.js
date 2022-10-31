import React, { useState } from "react";
import { sortableHandle } from "react-sortable-hoc";
import useTheme from "./../hooks/useTheme";
import CardIcons from "./CardIcons";
import FormInput from "./FormInput";

let persistentState = [];
let orignalElementKey;

const Time = ({
  handleClickedElement,
  uniqueIdentifier,
  editMode,
  handleChange,
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
        const previousElementName = persistentState.find(
          (pS) => pS.uniqueIdentifier === orignalElementKey
        ).elementName;
        const previousElementIsTemplateElement = persistentState.find(
          (pS) => pS.uniqueIdentifier === orignalElementKey
        ).isTemplateElement;
        persistentState = [
          ...persistentState,
          {
            uniqueIdentifier,
            value: previousElementValue,
            elementName: previousElementName,
            isTemplateElement: previousElementIsTemplateElement,
          },
        ];
        orignalElementKey = undefined;
      } else {
        persistentState = [
          ...persistentState,
          { uniqueIdentifier, value: "", elementName: "Time" },
        ];
      }
    }
  } else {
    persistentState = [
      ...persistentState,
      { uniqueIdentifier, value: "", elementName: "Time" },
    ];
  }

  const element = persistentState.find(
    (pS) => pS.uniqueIdentifier === uniqueIdentifier
  );

  const [value, setValue] = useState(element ? element.value : "");
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
      fontColor,
      primaryColor,
      whiteColor,
      inputStyle,
      labelAlignment,
    },
  } = useTheme();

  return (
    <div className="af_h_box" id={uniqueIdentifier}>
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
              name="Time"
              uniqueIdentifier={uniqueIdentifier}
              editMode={editMode}
            />
          )}
        </div>
      </div>
      <div className="af_h_title_box_text custom-card-body-padding af_h_time_box">
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
          <div className="col-4">
            <FormInput
              value=""
              disabled
              type="text"
              formStyle={inputStyle}
              className="form-textbox"
              labelAlign={labelAlignment}
              placeholder="Hours *"
            />
          </div>
          <div className="col-4">
            <FormInput
              value=""
              disabled
              type="text"
              formStyle={inputStyle}
              className="form-textbox"
              labelAlign={labelAlignment}
              placeholder="Minutes *"
            />
          </div>
          <div className="col-4">
            <FormInput
              value=""
              disabled
              type="text"
              formStyle={inputStyle}
              className="form-textbox"
              labelAlign={labelAlignment}
              placeholder="Period *"
            />
          </div>
          {/* <div className="col-4">
            <div
              style={inputStyles}
              className="pos-relative expanding-search-title black-bottom-border"
            >
              <i>Hours</i>
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
          </div>
          <div className="col-4">
            <div
              style={inputStyles}
              className="pos-relative expanding-search-title black-bottom-border"
            >
              <i>Minutes</i>
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
          </div>
          <div className="col-4">
            <div
              style={inputStyles}
              className="pos-relative expanding-search-title black-bottom-border"
            >
              <i>Period</i>
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

export default Time;

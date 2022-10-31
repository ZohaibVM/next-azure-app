import React, { useState } from "react";
import { sortableHandle } from "react-sortable-hoc";
import CardIcons from "./CardIcons";
import useTheme from "./../hooks/useTheme";
import FormInput from "./FormInput";

let persistentState = [];
let orignalElementKey;

const Name = ({
  handleClickedElement,
  uniqueIdentifier,
  editMode,
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
            isPrimary: previousElementIsPrimary,
            isTemplateElement: previousElementIsTemplateElement,
            elementName: previousElementName,
          },
        ];
        orignalElementKey = undefined;
      } else {
        persistentState = [
          ...persistentState,
          { uniqueIdentifier, isPrimary: false, elementName: "Name" },
        ];
      }
    }
  } else {
    persistentState = [
      ...persistentState,
      { uniqueIdentifier, isPrimary: false, elementName: "Name" },
    ];
  }

  const element = persistentState.find(
    (pS) => pS.uniqueIdentifier === uniqueIdentifier
  );

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
    selectedTheme: { primaryColor, whiteColor, inputStyle, labelAlignment },
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
              name="Full Name"
              uniqueIdentifier={uniqueIdentifier}
              editMode={editMode}
              isPrimary={isPrimary}
            />
          )}
        </div>
      </div>
      <div className="af_h_title_box_text custom-card-body-padding">
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
              placeholder="Middle Name"
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
        {/* <div className="tb_drop1">
          <div className="expanding-search-form">
            <div
              style={inputStyles}
              className="pos-relative expanding-search-title black-bottom-border"
            >
              <i>Prefix</i>
              <div
                style={{
                  borderColor: primaryColor,
                  backgroundColor: inputBgColor,
                }}
                className={getBorderStyles()}
              ></div>
            </div>
          </div>
        </div>
        <div className="tb_drop1 my-1">
          <div className="expanding-search-form">
            <div
              style={inputStyles}
              className="pos-relative expanding-search-title black-bottom-border"
            >
              <i>First Name</i>
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
        </div>
        <div className="tb_drop1">
          <div className="expanding-search-form">
            <div
              style={inputStyles}
              className="pos-relative expanding-search-title black-bottom-border"
            >
              <i>Middle Name</i>
              <div
                style={{
                  borderColor: primaryColor,
                  backgroundColor: inputBgColor,
                }}
                className={getBorderStyles()}
              ></div>
            </div>
          </div>
        </div>
        <div className="tb_drop1 mt-1">
          <div className="expanding-search-form">
            <div
              style={inputStyles}
              className="pos-relative expanding-search-title black-bottom-border"
            >
              <i>Last Name</i>
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
        </div> */}
      </div>
    </div>
  );
};

export default Name;

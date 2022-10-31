import React, { useState } from "react";
import { sortableHandle } from "react-sortable-hoc";
import CardIcons from "./CardIcons";
import useTheme from "./../hooks/useTheme";

let persistentState = [];
let orignalElementKey;

const LongText = ({
  handleClickedElement,
  uniqueIdentifier,
  handleChange,
  editMode,
  handleEditableElementChange,
}) => {
  const DragHandle = sortableHandle(() => (
    <span className="mr-2" style={{ cursor: "grab" }}>
      <i
        className="fa fa-bars"
        aria-hidden="true"
        style={{ fontSize: "1.2em" }}
      ></i>
    </span>
  ));

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
          { uniqueIdentifier, value: "", elementName: "Long Text" },
        ];
      }
    }
  } else {
    persistentState = [
      ...persistentState,
      { uniqueIdentifier, value: "", elementName: "Long Text" },
    ];
  }

  const element = persistentState.find(
    (pS) => pS.uniqueIdentifier === uniqueIdentifier
  );

  const [value, setValue] = useState(element ? element.value : "");
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
    selectedTheme: { fontColor, primaryColor, whiteColor, secondaryColor },
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
              name="Long Text"
              uniqueIdentifier={uniqueIdentifier}
              editMode={editMode}
            />
          )}
        </div>
      </div>
      <div className="af_h_title_box_text custom-card-body-padding addrees_box_drag">
        <div className="custom-input-wrappper-application-form">
          <div style={{ color: fontColor }} className="expanding-search-title">
            Long Text
            <span
              style={{ backgroundColor: secondaryColor, color: whiteColor }}
            >
              *
            </span>
          </div>
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Please Enter Description here..."
            id={uniqueIdentifier}
            style={{ color: fontColor }}
          />
        </div>
      </div>
    </div>
  );
};

export default LongText;

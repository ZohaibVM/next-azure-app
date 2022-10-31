import React, { useState } from "react";
import { sortableHandle } from "react-sortable-hoc";
import useTheme from "./../hooks/useTheme";

let persistentState = [];

const Heading = ({
  uniqueIdentifier,
  handleChange,
  editMode,
  handleClickedElement,
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
            elementName: editMode.name,
          },
        ];
      }
    } else {
      persistentState = [
        ...persistentState,
        { uniqueIdentifier, value: editMode.value, elementName: editMode.name },
      ];
    }
  } else {
    if (persistentState.length) {
      if (
        !persistentState.find((pS) => pS.uniqueIdentifier === uniqueIdentifier)
      ) {
        persistentState = [
          ...persistentState,
          { uniqueIdentifier, value: "", elementName: "Heading" },
        ];
      }
    } else {
      persistentState = [
        ...persistentState,
        { uniqueIdentifier, value: "", elementName: "Heading" },
      ];
    }
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

  const handleContentEditableChange = (e) => {
    if (element) {
      element.elementName = e.target.innerText;
      persistentState = [...persistentState];
    }

    handleEditableElementChange(e);
  };

  const {
    selectedTheme: { fontColor, primaryColor, whiteColor },
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
          <div className="r_cI_titlebox_txt d-flex">
            <DragHandle />
            <div
              contentEditable
              onInput={handleContentEditableChange}
              id="element"
              uniqueIdentifier={uniqueIdentifier}
              className="react-application-form-section-element-heading"
              dataToggle="tooltip"
              title="This text is editable"
            >
              {element.elementName}
            </div>
          </div>
          <div className="float-right">
            <span
              className="cursor-pointer element-icon"
              onClick={(e) =>
                handleClickedElement(e, "Heading", uniqueIdentifier)
              }
              id="remove-icon"
            >
              <i className="fa fa-trash-o"></i>
            </span>
          </div>
        </div>
      </div>
      <div className="af_h_title_box_text custom-card-body-padding">
        <div className="custom-input-wrappper-application-form">
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Please Enter Description here..."
            style={{ color: fontColor }}
          />
        </div>
      </div>
    </div>
  );
};

export default Heading;

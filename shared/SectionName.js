import React, { useState } from "react";
import useTheme from "./../hooks/useTheme";

let persistentState = [];

const SectionName = ({
  uniqueIdentifier,
  handleChange,
  editMode,
  handleRemoveSection,
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
            sectionName: editMode.name,
          },
        ];
      }
    } else {
      persistentState = [
        ...persistentState,
        { uniqueIdentifier, value: editMode.value, sectionName: editMode.name },
      ];
    }
  } else {
    if (persistentState.length) {
      if (
        !persistentState.find((pS) => pS.uniqueIdentifier === uniqueIdentifier)
      ) {
        persistentState = [
          ...persistentState,
          { uniqueIdentifier, value: "", sectionName: "Section Name" },
        ];
      }
    } else {
      persistentState = [
        ...persistentState,
        { uniqueIdentifier, value: "", sectionName: "Section Name" },
      ];
    }
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
    handleChange(e, uniqueIdentifier, true);
  };

  const handleContentEditableChange = (e) => {
    if (element) {
      element.sectionName = e.target.innerText;
      persistentState = [...persistentState];
    }

    handleEditableElementChange(e);
  };

  const {
    selectedTheme: { fontColor, primaryColor, whiteColor },
  } = useTheme();

  return (
    <div className="af_h_box" style={{ margin: 0 }}>
      <div className="af_h_title_box">
        <div
          className="af-t-primary"
          style={{
            background: primaryColor,
            color: whiteColor,
          }}
        >
          <div
            className="r_cI_titlebox_txt"
            contentEditable
            onInput={handleContentEditableChange}
            id="section"
            uniqueIdentifier={uniqueIdentifier}
            dataToggle="tooltip"
            title="This text is editable"
          >
            {element.sectionName}
          </div>
        </div>
      </div>
      <div className="af_h_title_box_text custom-card-body-padding">
        <div className="form-label-group">
          <input
            type="text"
            value={value}
            onChange={handleInputChange}
            className="form-control"
            placeholder="Please Enter Description here..."
            name="Title"
            style={{ color: fontColor }}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionName;

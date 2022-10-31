import React, { useState } from "react";
import { sortableHandle } from "react-sortable-hoc";
import CardIcons from "./CardIcons";
import useTheme from "./../hooks/useTheme";

let persistentState = [];
let orignalElementKey;

const ScaleRating = ({
  handleClickedElement,
  uniqueIdentifier,
  handleChange,
  editMode,
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
          { uniqueIdentifier, value: "", elementName: "Scale Rating" },
        ];
      }
    }
  } else {
    persistentState = [
      ...persistentState,
      { uniqueIdentifier, value: "", elementName: "Scale Rating" },
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
              name="Scale Rating"
              uniqueIdentifier={uniqueIdentifier}
              editMode={editMode}
            />
          )}
        </div>
      </div>
      <div className="af_h_title_box_text custom-card-body-padding dropdown_box_drag af_h_SRating">
        <div className="custom-input-wrappper-application-form">
          <div style={{ color: fontColor }} className="expanding-search-title">
            Type Question
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
            style={{ color: fontColor }}
          />
          <div className="af_h_SR_box_list mt-2">
            <span>Worst</span>
            <div className="SR_box_number">
              <ul>
                <li>
                  <div style={{ color: primaryColor }} className="SR_number__">
                    1
                  </div>
                  <div
                    style={{ borderColor: primaryColor }}
                    className="SR_rounded__"
                  ></div>
                </li>
                <li>
                  <div style={{ color: primaryColor }} className="SR_number__">
                    2
                  </div>
                  <div
                    style={{ borderColor: primaryColor }}
                    className="SR_rounded__"
                  ></div>
                </li>
                <li>
                  <div style={{ color: primaryColor }} className="SR_number__">
                    3
                  </div>
                  <div
                    style={{ borderColor: primaryColor }}
                    className="SR_rounded__"
                  ></div>
                </li>
                <li>
                  <div style={{ color: primaryColor }} className="SR_number__">
                    4
                  </div>
                  <div
                    style={{ borderColor: primaryColor }}
                    className="SR_rounded__"
                  ></div>
                </li>
                <li>
                  <div style={{ color: primaryColor }} className="SR_number__">
                    5
                  </div>
                  <div
                    style={{ borderColor: primaryColor }}
                    className="SR_rounded__"
                  ></div>
                </li>
              </ul>
            </div>
            <span>Best</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScaleRating;

import React, { useState } from "react";
import { sortableHandle } from "react-sortable-hoc";
import CardIcons from "./CardIcons";
import Input from "./Input";
import useTheme from "./../hooks/useTheme";

let persistentState = [];
let orignalElementKey;
let orignalElementOptions = [];
let orignalElementKeyForInput;
let persistentIsNew;

const MultipleChoiceQuestion = ({
  handleClickedElement,
  uniqueIdentifier,
  handleChange,
  isNew,
  handleOptionsChange,
  editMode,
  handleEditableElementChange,
}) => {
  persistentIsNew = isNew;
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
    let opts = [];
    let i = 0;
    for (const property in editMode.options) {
      console.log(property);
      opts = [...opts, i];
      i++;
    }
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
            options: opts,
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
          options: opts,
          elementName: editMode.name,
        },
      ];
    }
  } else if (persistentState.length) {
    if (
      !persistentState.find((pS) => pS.uniqueIdentifier === uniqueIdentifier)
    ) {
      if (orignalElementKey || orignalElementOptions.length) {
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
            options: orignalElementOptions,
            elementName: previousElementName,
            isTemplateElement: previousElementIsTemplateElement,
          },
        ];
        orignalElementKey = undefined;
        orignalElementOptions = [];
      } else {
        persistentState = [
          ...persistentState,
          {
            uniqueIdentifier,
            value: "",
            options: [0, 1],
            elementName: "Multiple Choice Question",
          },
        ];
      }
    }
  } else {
    persistentState = [
      ...persistentState,
      {
        uniqueIdentifier,
        value: "",
        options: [0, 1],
        elementName: "Multiple Choice Question",
      },
    ];
  }

  const element = persistentState.find(
    (pS) => pS.uniqueIdentifier === uniqueIdentifier
  );

  const [value, setValue] = useState(element ? element.value : "");
  const [options, setOptions] = useState(element ? element.options : [0, 1]);
  const handleInputChange = (e) => {
    if (element) {
      element.value = e.target.value;
      persistentState = [...persistentState];
    }
    setValue(e.target.value);
    handleChange(e, uniqueIdentifier);
  };

  const handleAddOptionClick = () => {
    if (element) {
      element.options = [...element.options, element.options.length];
      persistentState = [...persistentState];
    }
    setOptions(element.options);
  };

  const handleIconsClick = (e, name, uniqueIdentifier) => {
    if (e.currentTarget.id === "duplicate-icon") {
      persistentIsNew = false;
      orignalElementKey = uniqueIdentifier;
      orignalElementOptions = element.options;
      orignalElementKeyForInput = uniqueIdentifier;
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
              name="Multiple Choice"
              uniqueIdentifier={uniqueIdentifier}
              editMode={editMode}
            />
          )}
        </div>
      </div>
      <div className="af_h_title_box_text custom-card-body-padding dropdown_box_drag">
        <div className="custom-input-wrappper-application-form">
          <div style={{ color: fontColor }} className="expanding-search-title">
            Question
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
            placeholder="Please Enter Question Here..."
            style={{ color: fontColor }}
          />
        </div>
        <div className="af_h_dd_box_list af_h_SCQ af_h_MCQ custom-options-wrappper-application-form">
          {options.map((v) => (
            <Input
              index={v}
              key={v + 1}
              uniqueIdentifier={uniqueIdentifier}
              orignalElementKeyForInput={orignalElementKeyForInput}
              isNew={persistentIsNew}
              handleOptionsChange={handleOptionsChange}
              editMode={editMode}
            />
          ))}
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3 float-right"
          id="custom-application-form-element-button"
          onClick={handleAddOptionClick}
          style={{ backgroundColor: primaryColor, borderColor: primaryColor }}
        >
          ADD OPTION
        </button>
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;

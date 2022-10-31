import React from "react";
import useTheme from "./../hooks/useTheme";

let persistentState = [];

const CardIcons = ({
  handleClickedElement,
  uniqueIdentifier,
  name,
  editMode,
  isPrimary,
}) => {
  if (editMode.status) {
    if (persistentState.length) {
      if (
        !persistentState.find((pS) => pS.uniqueIdentifier === uniqueIdentifier)
      ) {
        persistentState = [
          ...persistentState,
          {
            visible: editMode.isVisible,
            required: editMode.isVisible ? editMode.isRequired : false,
            uniqueIdentifier,
          },
        ];
      }
    } else {
      persistentState = [
        ...persistentState,
        {
          visible: editMode.isVisible,
          required: editMode.isVisible ? editMode.isRequired : false,
          uniqueIdentifier,
        },
      ];
    }
  } else if (persistentState.length) {
    if (
      !persistentState.find((pS) => pS.uniqueIdentifier === uniqueIdentifier)
    ) {
      persistentState = [
        ...persistentState,
        { visible: true, required: false, uniqueIdentifier },
      ];
    }
  } else {
    persistentState = [
      ...persistentState,
      { visible: true, required: false, uniqueIdentifier },
    ];
  }
  const element = persistentState.find(
    (pS) => pS.uniqueIdentifier === uniqueIdentifier
  );

  if (element.uniqueIdentifier === uniqueIdentifier) {
    if (isPrimary) {
      element.visible = true;
      element.required = true;
    }
  }

  const handleIconsClick = (e) => {
    if (e.currentTarget.id === "visibility-icon") {
      if (isPrimary) {
        element.visible = true;
        element.required = true;
      } else {
        if (element.visible) {
          element.required = false;
        }
        element.visible = !element.visible;
      }
    }
    if (e.currentTarget.id === `required-toggle-icon`) {
      if (isPrimary) {
        element.visible = true;
        element.required = true;
      } else {
        if (element.visible) {
          element.required = !element.required;
        }
      }
    }
    handleClickedElement(e, name, uniqueIdentifier);
  };

  const {
    selectedTheme: { toggleIconColor, whiteColor },
  } = useTheme();

  return (
    <div className="r_cI_titlebox_right_icon d-flex">
      <div
        className="toggle-container mr-1 element-icon"
        onClick={handleIconsClick}
        id={`required-toggle-icon`}
        dataToggle="tooltip"
        title="Mark/Un Mark element as required"
        style={{ backgroundColor: whiteColor }}
      >
        <div
          className={`dialog-button ${
            element.uniqueIdentifier === uniqueIdentifier && element.required
              ? ""
              : "disabled"
          }`}
          style={{ backgroundColor: toggleIconColor }}
        />
      </div>
      <span
        className="cursor-pointer element-icon"
        onClick={handleIconsClick}
        id="visibility-icon"
        dataToggle="tooltip"
        title="Toggle visibilty of element"
      >
        <i
          className={`text-white feather ${
            element.uniqueIdentifier === uniqueIdentifier && element.visible
              ? "icon-eye"
              : "icon-eye-off"
          }`}
        ></i>
      </span>
      <span
        className="mx-1 cursor-pointer element-icon"
        onClick={handleIconsClick}
        id="duplicate-icon"
        dataToggle="tooltip"
        title="Duplicate element"
      >
        <i className="feather icon-copy"></i>
      </span>
      <span
        className="cursor-pointer element-icon"
        onClick={handleIconsClick}
        id="remove-icon"
        dataToggle="tooltip"
        title="Delete element"
      >
        <i className="fa fa-trash-o"></i>
      </span>
    </div>
  );
};

export default CardIcons;

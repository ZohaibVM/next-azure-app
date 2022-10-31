import React, { useState } from "react";
import useTheme from "./../hooks/useTheme";
let persistentState = [];
let orignalElementKey;

const Input = ({
  index,
  uniqueIdentifier,
  orignalElementKeyForInput,
  isNew,
  handleOptionsChange,
  editMode,
}) => {
  if (orignalElementKeyForInput) {
    orignalElementKey = orignalElementKeyForInput;
  }

  if (isNew) {
    orignalElementKey = undefined;
  }

  if (editMode.status) {
    const currentOptionValue = Object.values(editMode.options).find(
      (v, i) => i === index
    );
    if (
      !persistentState.find(
        (pS) => pS.uniqueIdentifier === uniqueIdentifier && pS.index === index
      )
    ) {
      persistentState = [
        ...persistentState,
        { uniqueIdentifier, index, value: currentOptionValue },
      ];
      // const previousElement = persistentState.find(pS => pS.uniqueIdentifier === orignalElementKey && pS.index === index)
      // if(previousElement) {
      // persistentState = [ ...persistentState, { uniqueIdentifier, value: previousElement.value, index: previousElement.index }]
      // } else {
      // persistentState = [ ...persistentState, { uniqueIdentifier, index, value: "" }]
      // }
      // persistentState = [ ...persistentState, { uniqueIdentifier, index, value: "" }]
    }
  } else if (persistentState.length) {
    if (
      !persistentState.find(
        (pS) => pS.uniqueIdentifier === uniqueIdentifier && pS.index === index
      )
    ) {
      if (orignalElementKey) {
        const previousElement = persistentState.find(
          (pS) =>
            pS.uniqueIdentifier === orignalElementKey && pS.index === index
        );
        if (previousElement) {
          persistentState = [
            ...persistentState,
            {
              uniqueIdentifier,
              value: previousElement.value,
              index: previousElement.index,
            },
          ];
        } else {
          persistentState = [
            ...persistentState,
            { uniqueIdentifier, index, value: "" },
          ];
        }
      } else {
        persistentState = [
          ...persistentState,
          { uniqueIdentifier, index, value: "" },
        ];
      }
    }
  } else {
    persistentState = [
      ...persistentState,
      { uniqueIdentifier, index, value: "" },
    ];
  }

  const element = persistentState.find(
    (pS) => pS.uniqueIdentifier === uniqueIdentifier && pS.index === index
  );

  const [value, setValue] = useState(element ? element.value : "");
  const handleInputChange = (e) => {
    if (element) {
      element.value = e.target.value;
      persistentState = [...persistentState];
      handleOptionsChange(
        element.value,
        uniqueIdentifier,
        `option ${index + 1}`
      );
    }

    setValue(e.target.value);
  };

  const {
    selectedTheme: { fontColor },
  } = useTheme();

  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      className="form-control"
      placeholder={`Please Enter Option ${index + 1} Here...`}
      style={{ color: fontColor }}
    />
  );
};

export default Input;

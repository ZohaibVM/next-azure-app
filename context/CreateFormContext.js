import React, { useState } from "react";
// import SectionName from "./../shared/SectionName";
// import Faker from "faker";

export const CreateFormContext = React.createContext({});

CreateFormContext.displayName = "CreateFormContext";

// const generateRandomString = () =>
//   `${Faker.name.findName()}-${Math.random()}-${Faker.internet.email()}`;

// let persistentSections;
// let persistentActiveStep;

export const CreateContextProvider = ({ children }) => {
  const [forms, setForms] = useState([]);

  // console.log({ forms });

  const onAddForm = (form) => {
    const newFormId = forms.findIndex((frm) => frm.formId === form.formId);
    // console.log({ newFormId });
    if (newFormId >= 0) {
      const formsClone = [...forms];
      formsClone[newFormId] = { ...form };
      setForms([...formsClone]);
      return;
    }
    setForms((prevForms) => {
      return [...prevForms, form];
    });
  };

  // const uniqueIdentifier = generateRandomString();

  // const handleEditableElementChange = (e) => {
  //   const key = e.target.getAttribute("uniqueIdentifier");
  //   const persistentSectionsCopy = [...persistentSections];
  //   switch (e.target.id) {
  //     case "section":
  //       const selectedSection = persistentSectionsCopy.find(
  //         (s) => s.uniqueIdentifier === key
  //       );
  //       selectedSection.name = e.target.innerText;
  //       setSections(persistentSectionsCopy);
  //       break;
  //     case "element":
  //       persistentSections &&
  //         persistentSections.forEach((section) => {
  //           const currentElement = section.elements.find(
  //             (element) => element.uniqueIdentifier === key
  //           );
  //           if (currentElement) {
  //             currentElement.name = e.target.innerText;
  //           }
  //         });
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const handleSingleInputChange = (e, uniquekey, isSection = false) => {
  //   const newSections = [...persistentSections];
  //   const activeSection = newSections.find(
  //     (section) =>
  //       section.uniqueIdentifier === persistentActiveStep.uniqueIdentifier
  //   );
  //   if (isSection) {
  //     activeSection.value = e.currentTarget.value;
  //   } else {
  //     const modifiedElement = activeSection.elements.find(
  //       ({ uniqueIdentifier }) => uniqueIdentifier === uniquekey
  //     );
  //     if (modifiedElement) {
  //       modifiedElement.value = e.currentTarget.value;
  //     }
  //   }
  //   if (
  //     window.location.pathname.toLowerCase().includes("edit") ||
  //     (window.location.pathname.toLowerCase().includes("create") &&
  //       window.location.search.length)
  //   ) {
  //     persistentSections = newSections;
  //   } else {
  //     persistentSections = isSection ? newSections : sections;
  //   }
  // };

  // const [activeStep, setActiveStep] = useState({
  //   name: "Section Name",
  //   reactElement: (
  //     <SectionName
  //       uniqueIdentifier={uniqueIdentifier}
  //       editMode={{ status: false }}
  //       handleEditableElementChange={handleEditableElementChange}
  //       handleChange={handleSingleInputChange}
  //     />
  //   ),
  //   elements: [],
  //   value: null,
  //   uniqueIdentifier,
  //   isFirstSection: true,
  //   elementType: "Section Name",
  // });

  // const [sections, setSections] = useState([
  //   {
  //     name: "Section Name",
  //     reactElement: (
  //       <SectionName
  //         uniqueIdentifier={uniqueIdentifier}
  //         editMode={{ status: false }}
  //         handleEditableElementChange={handleEditableElementChange}
  //         handleChange={handleSingleInputChange}
  //       />
  //     ),
  //     elements: [],
  //     value: null,
  //     uniqueIdentifier,
  //     isFirstSection: true,
  //     elementType: "Section Name",
  //   },
  // ]);

  return (
    <CreateFormContext.Provider
      value={{
        forms,
        onAddForm,
        // activeStep,
        // sections,

        // uniqueIdentifier,
        // persistentSections,
        // persistentActiveStep,

        // setSections,
        // setActiveStep,
        // handleSingleInputChange,
        // handleEditableElementChange,
        // generateRandomString,
      }}
    >
      {children}
    </CreateFormContext.Provider>
  );
};

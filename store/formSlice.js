import { createSlice, current } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const multiFields = ["address", "full name", "phone number", "time"];
const singleFields = [
  "email address",
  "date",
  "integer",
  "decimal",
  "long text",
  "short text",
  "multiple choice",
  "single choice",
  "file upload",
  "dropdown",
  "scale rating",
  "signature",
];

const getMultiple = (name) => {
  switch (name) {
    case "address":
      return [
        {
          order: 1,
          fieldTitle: "Street Address",
          isVisible: true,
          isRequired: true,
          fieldType: "text",
          placeholder: "",
          defaultValue: "",
          value: "",
        },
        {
          order: 2,
          fieldTitle: "Street Address Line 2",
          isVisible: true,
          isRequired: true,
          fieldType: "text",
          placeholder: "",
          defaultValue: "",
          value: "",
        },
        {
          order: 3,
          fieldTitle: "City",
          isVisible: true,
          isRequired: true,
          fieldType: "text",
          placeholder: "",
          defaultValue: "",
          value: "",
        },
        {
          order: 4,
          fieldTitle: "State/Province",
          isVisible: true,
          isRequired: true,
          fieldType: "text",
          placeholder: "",
          defaultValue: "",
          value: "",
        },
        {
          order: 5,
          fieldTitle: "Postal/Zipcode",
          isVisible: true,
          isRequired: true,
          fieldType: "text",
          placeholder: "",
          defaultValue: "",
          value: "",
        },
        {
          order: 5,
          fieldTitle: "Country",
          isVisible: true,
          isRequired: true,
          fieldType: "dropdown",
          isMultiSelect: false,
          placeholder: "",
          defaultValue: "",
          value: "",
          options: [
            {
              title: "Option 1",
              value: "opt1",
              isVisible: true,
              isDefault: true,
            },
            {
              title: "Option 2",
              value: "opt2",
              isVisible: true,
              isDefault: false,
            },
            {
              title: "Option 3",
              value: "opt3",
              isVisible: true,
              isDefault: false,
            },
          ],
        },
      ];
    case "full name":
      return [
        {
          order: 1,
          fieldTitle: "Prefix",
          isVisible: true,
          isRequired: false,
          fieldType: "dropdown",
          isMultiSelect: false,
          placeholder: "Dummy Text",
          defaultValue: "",
          value: "",
          options: [
            {
              title: "Mr.",
              value: "mr",
              isVisible: true,
              isDefault: true,
            },
            {
              title: "Mrs.",
              value: "mrs",
              isVisible: false,
              isDefault: false,
            },
            {
              title: "Ms.",
              value: "ms",
              isVisible: true,
              isDefault: false,
            },
          ],
        },
        {
          order: 2,
          fieldTitle: "First Name",
          isVisible: true,
          isRequired: true,
          fieldType: "text",
          placeholder: "Dummy Text",
          defaultValue: "",
          value: "",
        },
        {
          order: 3,
          fieldTitle: "Middle Name",
          isVisible: true,
          isRequired: false,
          fieldType: "text",
          placeholder: "Dummy Text",
          defaultValue: "",
          value: "",
        },
        {
          order: 4,
          fieldTitle: "Last Name",
          isVisible: true,
          isRequired: true,
          fieldType: "text",
          placeholder: "Dummy Text",
          defaultValue: "",
          value: "",
        },
      ];
    case "phone number":
      return [
        {
          order: 1,
          fieldTitle: "Area Code",
          isVisible: true,
          isRequired: true,
          fieldType: "text",
          placeholder: "",
          defaultValue: "",
          value: "",
        },
        {
          order: 2,
          fieldTitle: "Phone Number",
          isVisible: true,
          isRequired: true,
          fieldType: "text",
          placeholder: "",
          defaultValue: "",
          value: "",
        },
      ];
    case "time":
      return [
        {
          order: 1,
          fieldTitle: "Hours",
          isVisible: true,
          isRequired: true,
          fieldType: "text",
          placeholder: "",
          defaultValue: "",
          value: "",
        },
        {
          order: 2,
          fieldTitle: "Minutes",
          isVisible: true,
          isRequired: true,
          fieldType: "text",
          placeholder: "",
          defaultValue: "",
          value: "",
        },
        {
          order: 3,
          fieldTitle: "Period",
          isVisible: true,
          isRequired: true,
          fieldType: "text",
          placeholder: "",
          defaultValue: "",
          value: "",
        },
      ];
    default:
      return "invalid name";
  }
};

const getSingle = (name) => {
  switch (name) {
    case "email address":
      return [
        {
          order: 1,
          fieldTitle: "Email Address",
          isVisible: true,
          isRequired: true,
          fieldType: "email",
          placeholder: "",
          defaultValue: "",
          value: "",
        },
      ];
    case "date":
      return [
        {
          order: 1,
          fieldTitle: "Date",
          isVisible: true,
          isRequired: true,
          fieldType: "date",
          placeholder: "",
          defaultValue: "",
          value: "",
        },
      ];
    case "integer":
      return [
        {
          order: 1,
          fieldTitle: "Integer",
          isVisible: true,
          isRequired: true,
          fieldType: "number",
          placeholder: "",
          defaultValue: "",
          value: "",
        },
      ];
    case "decimal":
      return [
        {
          order: 1,
          fieldTitle: "Decimel",
          isVisible: true,
          isRequired: true,
          fieldType: "number",
          placeholder: "",
          defaultValue: "",
          value: "",
        },
      ];
    case "long text":
      return [
        {
          order: 1,
          fieldTitle: "Long Text",
          isVisible: true,
          isRequired: true,
          fieldType: "textarea",
          placeholder: "",
          defaultValue: "",
          value: "",
        },
      ];
    case "short text":
      return [
        {
          order: 1,
          fieldTitle: "Short Text",
          isVisible: true,
          isRequired: true,
          fieldType: "text",
          placeholder: "",
          defaultValue: "",
          value: "",
        },
      ];
    case "multiple choice":
      return [
        {
          order: 1,
          fieldTitle: "Multichoice",
          isVisible: true,
          isRequired: true,
          fieldType: "dropdown",
          isMultiSelect: true,
          placeholder: "",
          defaultValue: "",
          value: "",
          options: [
            {
              title: "Ms.",
              value: "ms",
              isVisible: true,
              isDefault: false,
            },
          ],
        },
      ];
    case "single choice":
      return [
        {
          order: 1,
          fieldTitle: "Singlechoice",
          isVisible: true,
          isRequired: true,
          fieldType: "dropdown",
          isMultiSelect: false,
          placeholder: "",
          defaultValue: "",
          value: "",
          options: [
            {
              title: "Ms.",
              value: "ms",
              isVisible: true,
              isDefault: false,
            },
          ],
        },
      ];
    case "file upload":
      return [
        {
          order: 1,
          fieldTitle: "File Upload",
          isVisible: true,
          isRequired: true,
          fieldType: "file",
          placeholder: "",
          defaultValue: "",
          value: "",
        },
      ];
    case "dropdown":
      return [
        {
          order: 1,
          fieldTitle: "Dropdown",
          isVisible: true,
          isRequired: false,
          fieldType: "dropdown",
          isMultiSelect: false,
          placeholder: "",
          defaultValue: "",
          value: "",
          options: [
            {
              title: "Mr.",
              value: "mr",
              isVisible: true,
              isDefault: true,
            },
            {
              title: "Mrs.",
              value: "mrs",
              isVisible: false,
              isDefault: false,
            },
            {
              title: "Ms.",
              value: "ms",
              isVisible: true,
              isDefault: false,
            },
          ],
        },
      ];
    case "scale rating":
      return [
        {
          order: 1,
          fieldTitle: "Scale Rating",
          isVisible: true,
          isRequired: false,
          fieldType: "rating",
          placeholder: "",
          defaultValue: "",
          value: "",
        },
      ];
    case "signature":
      return [
        {
          order: 1,
          fieldTitle: "Signature",
          isVisible: true,
          isRequired: false,
          fieldType: "signature",
          placeholder: "",
          defaultValue: "",
          value: "",
        },
      ];
    default:
      return "invalid name";
  }
};

const formSlice = createSlice({
  name: "form",
  initialState: {
    forms: [],
  },
  reducers: {
    addForm: (state, action) => {
      const { sectionsData, title, formId } = action.payload;
      const formIndex = state.forms.findIndex((form) => form.formId === formId);

      if (formIndex >= 0) {
        const prevForm = state.forms.find((form) => form.formId === formId);

        const newSectionData = sectionsData.map((section, sectionIndex) => {
          return {
            sectionId: prevForm.sections[sectionIndex]?.sectionId
              ? prevForm.sections[sectionIndex]?.sectionId
              : uuidv4(),
            sectionTitle: section.name,
            sectionDescription: section.value ? section.value : "",
            isFirstSection: true,
            elements: section.elements.map((element, elementIndex) => {
              return {
                id: prevForm.sections[sectionIndex]?.elements[elementIndex]?.id
                  ? prevForm.sections[sectionIndex]?.elements[elementIndex]?.id
                  : uuidv4(),
                elementType: element.elementType,
                elementTitle: element.name,
                elementDescription: element.value ? element.value : "",
                isMultiFieldElement: multiFields.includes(element.elementType)
                  ? true
                  : false,
                isRequired: true,
                isPrimary: true,
                isVisible: true,
                isTemplateElement: true,
                fields: multiFields.includes(element.elementType)
                  ? getMultiple(element.elementType)
                  : singleFields.includes(element.elementType)
                  ? getSingle(element.elementType)
                  : null,
              };
            }),
          };
        });

        console.log(newSectionData);

        state.forms[formIndex] = {
          ...state.forms[formIndex],
          formTitle: title,
          sections: [...newSectionData],
        };
      } else {
        const newSectionData = sectionsData.map((section) => {
          return {
            sectionId: uuidv4(),
            sectionTitle: section.name,
            sectionDescription: section.value ? section.value : "",
            isFirstSection: true,
            elements: section.elements.map((element) => {
              return {
                id: uuidv4(),
                elementType: element.elementType,
                elementTitle: element.name,
                elementDescription: element.value ? element.value : "",
                isMultiFieldElement: multiFields.includes(element.elementType)
                  ? true
                  : false,
                isRequired: true,
                isPrimary: true,
                isVisible: true,
                isTemplateElement: true,
                fields: multiFields.includes(element.elementType)
                  ? getMultiple(element.elementType)
                  : singleFields.includes(element.elementType)
                  ? getSingle(element.elementType)
                  : null,
              };
            }),
          };
        });

        state.forms.push({
          formId,
          formTitle: title,
          formDescription: "",
          creationDate: Date.now(),
          lastUpdateDate: null,
          sections: [...newSectionData],
        });
      }
    },
    deleteForm: (state, action) => {
      const { id } = action.payload;
      state.forms = state.forms.filter((form) => form.formId !== id);
    },
  },
});

export const { addForm, deleteForm } = formSlice.actions;
export default formSlice.reducer;

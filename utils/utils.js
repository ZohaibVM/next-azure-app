export const initialValues = {
  addressline1: { value: "", required: true, error: false },
  addressline2: { value: "", required: false, error: false },
  city: { value: "", required: true, error: false },
  state: { value: "", required: true, error: false },
  country: { value: "", required: true, error: false },
  zipcode: { value: "", required: true, error: false },
  prefix: { value: "", required: true, error: false },
  firstname: { value: "", required: true, error: false },
  middlename: { value: "", required: false, error: false },
  lastname: { value: "", required: true, error: false },
  areacode: { value: "", required: true, error: false },
  phonenumber: { value: "", required: true, error: false },
  email: { value: "", required: true, error: false },
  hours: { value: "", required: true, error: false },
  minutes: { value: "", required: true, error: false },
  period: { value: "", required: true, error: false },
  date: { value: "", required: true, error: false },
  integar: { value: "", required: true, error: false },
  decimel: { value: "", required: true, error: false },
  longtext: { value: "", required: true, error: false },
  shorttext: { value: "", required: true, error: false },
  multichoice: {
    value: [],
    required: true,
    error: false,
  },
  singlechoice: { value: "", required: true, error: false },
  fileupload: { value: "", required: false, error: false },
  dropdown: { value: "", required: true, error: false },
};

export const checkboxInitialValues = [
  { label: "Option 1", checked: false },
  { label: "Option 2", checked: false },
  { label: "Option 3", checked: false },
];

export const radioInitialValues = [
  { label: "Option 1", checked: false, value: "radio1" },
  { label: "Option 2", checked: false, value: "radio2" },
  { label: "Option 3", checked: false, value: "radio3" },
];

export const dropdownValues = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

export const singleForm = {
  formId: "2a4bdafc-b33b-4f95-88d7-0cb9fac4d48a",
  formTitle: "Form Title",
  formDescription: "",
  creationDate: 1666961348712,
  lastUpdateDate: null,
  sections: [
    {
      sectionId: "ac00c94f-1f6b-48dc-bb0e-55c848e50a01",
      sectionTitle: "Section Name",
      sectionDescription: "section subtitle",
      isFirstSection: true,
      elements: [
        {
          id: "1f40505e-4824-4c40-a96a-946f34d8a5fd",
          elementType: "address",
          elementTitle: "address",
          elementDescription: "address subtitle",
          isMultiFieldElement: true,
          isRequired: true,
          isPrimary: true,
          isVisible: true,
          isTemplateElement: true,
          fields: [
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
          ],
        },
        {
          id: "59e445d9-15a2-4c5c-a7ac-65b27f462cd9",
          elementType: "full name",
          elementTitle: "full name",
          elementDescription: "",
          isMultiFieldElement: true,
          isRequired: true,
          isPrimary: true,
          isVisible: true,
          isTemplateElement: true,
          fields: [
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
          ],
        },
      ],
    },
  ],
};

export const mapFormState = (form) => {
  const sections = form.sections.map((sec) => sec);
  const elements = sections.map((sec) => sec.elements.map((el) => el)).flat();

  const fields = elements.map((elem) => {
    if (elem.elementType === "address") {
      return {
        addressline1: { value: "", required: true, error: false },
        addressline2: { value: "", required: false, error: false },
        city: { value: "", required: true, error: false },
        state: { value: "", required: true, error: false },
        country: { value: "", required: true, error: false },
        zipcode: { value: "", required: true, error: false },
      };
    }
    if (elem.elementType === "full name") {
      return {
        prefix: { value: "", required: true, error: false },
        firstname: { value: "", required: true, error: false },
        middlename: { value: "", required: false, error: false },
        lastname: { value: "", required: true, error: false },
      };
    }
    if (elem.elementType === "phone number") {
      return {
        areacode: { value: "", required: true, error: false },
        phonenumber: { value: "", required: true, error: false },
      };
    }
    if (elem.elementType === "email address") {
      return {
        email: { value: "", required: true, error: false },
      };
    }
    if (elem.elementType === "time") {
      return {
        hours: { value: "", required: true, error: false },
        minutes: { value: "", required: true, error: false },
        period: { value: "", required: true, error: false },
      };
    }
    if (elem.elementType === "date") {
      return {
        date: { value: "", required: true, error: false },
      };
    }
    if (elem.elementType === "integer") {
      return {
        integar: { value: "", required: true, error: false },
      };
    }
    if (elem.elementType === "decimal") {
      return {
        decimel: { value: "", required: true, error: false },
      };
    }
    if (elem.elementType === "long text") {
      return {
        longtext: { value: "", required: true, error: false },
      };
    }
    if (elem.elementType === "short text") {
      return {
        shorttext: { value: "", required: true, error: false },
      };
    }
    if (elem.elementType === "multiple choice") {
      return {
        multichoice: {
          value: [],
          required: true,
          error: false,
        },
      };
    }
    if (elem.elementType === "single choice") {
      return {
        singlechoice: { value: "", required: true, error: false },
      };
    }
    if (elem.elementType === "file upload") {
      return {
        fileupload: { value: "", required: false, error: false },
      };
    }
    if (elem.elementType === "dropdown") {
      return {
        dropdown: { value: "", required: true, error: false },
      };
    }
  });

  const formValuesObject = fields.reduce(
    (previousValue, currentValue) => ({
      ...previousValue,
      ...currentValue,
    }),
    {}
  );

  return formValuesObject;
};

export const multiFields = ["address", "full name", "phone number", "time"];
export const singleFields = [
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

export const getMultiple = (name) => {
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

export const getSingle = (name) => {
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
